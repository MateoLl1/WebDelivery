import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImagen',
})
export class NoImagenPipe implements PipeTransform {
  transform(images: any[]): string {
    if (!images) {
      return 'assest/img/noimage.png';
    }
    if (images.length > 0) {
      return images[0].em_imagen;
    } else {
      return 'assest/img/noimage.png';
    }
  }
}
