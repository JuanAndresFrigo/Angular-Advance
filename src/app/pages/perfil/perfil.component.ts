import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public perfileForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, Validators.required],
    });
  }
  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfileForm.value).subscribe(
      () => {
        const { nombre, email } = this.perfileForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Exito', 'Los cambios fueron guardados', 'success');
      },
      (err) => Swal.fire('Error', err.error.msg, 'error')
    );
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if (!file) {
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => (this.imgTemp = reader.result?.toString());
  }

  subirImagen() {
    const uid = this.usuarioService.uid || '';

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', uid)
      .then((img) => {
        this.usuario.img = img;
        Swal.fire('Exito', 'Imagen actualizada', 'success');
      })
      .catch(() =>
        Swal.fire('Error', 'no se pudo actualiza imagen de usuario', 'error')
      );
  }
}
