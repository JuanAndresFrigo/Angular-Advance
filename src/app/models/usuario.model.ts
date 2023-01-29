import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) {}

  public get imagenUrl(): string {
    // http://localhost:3000/api/uploads/medicos/1a9b9b3f-dcf7-410f-802c-b15018af2c00.jpg

    if (this.img?.includes('http')) {
      return this.img;
    }

    if (this.img) {
      return `${base_url}/uploads/usuarios/${this.img}`;
    } else {
      return `${base_url}/uploads/usuarios/no-img`;
    }
  }
}
