import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url:string = environment.base_url

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(img: any, tipo?: 'usuarios' | 'medicos' | 'hospitales'): string {
    if (!img) {
      return `${base_url}/uploads/usuarios/no-img`;
    } else if (img?.includes('http')) {
      return img;
    } else if (img) {
      return `${base_url}/uploads/${tipo}/${img}`;
    } else {
      return `${base_url}/uploads/usuarios/no-img`;
    }
  }
}
