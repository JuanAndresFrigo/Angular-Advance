import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ['Juan', [Validators.required]],
      email: ['test100@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      password2: ['123456', [Validators.required]],
      terminos: [true, [Validators.required]],
    },
    {
      Validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioservice: UsuarioService,
    private router: Router
  ) {}

  public crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) return;
    else {
      //Crear user
      this.usuarioservice.crearusuario(this.registerForm.value).subscribe(
        (res) => this.router.navigateByUrl('/'),
        (err) => Swal.fire('Error', err.error.msg, 'error')
      );
    }
  }

  public campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted)
      return true;
    else return false;
  }

  public aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  public contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmitted) return true;
    else return false;
  }

  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control?.value === pass2Control?.value)
        pass2Control?.setErrors(null);
      else pass2Control?.setErrors({ noEsIgual: true });
    };
  }
}
