import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required]],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioservice: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  public googleInit() {
    google.accounts.id.initialize({
      client_id:
        '903225222422-5gvep4ohqk2kpimid6us8orojk4a3f5a.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(
      // document.getElementById('buttonDiv'),

      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  public handleCredentialResponse(response: any) {
    this.usuarioservice.loginGoogle(response.credential).subscribe((res) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/');
      });
    });
  }

  login() {
    this.usuarioservice.login(this.loginForm.value).subscribe(
      (res) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem(
            'email',
            this.loginForm.get('email')?.value || ''
          );
        } else localStorage.removeItem('email');

        this.router.navigateByUrl('/');
      },
      (err) => Swal.fire('Error', err.error.msg, 'error')
    );
  }
}
