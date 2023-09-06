import { ImagesService } from 'src/app/services/images.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeliveryService } from './../../services/delivery.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inventario-productos',
  templateUrl: './inventario-productos.component.html',
  styleUrls: ['./inventario-productos.component.css'],
})
export class InventarioProductosComponent {
  txtPrecio = document.getElementById('txtPrecio') as HTMLInputElement;
  empresa: any[] = [];
  nombreProducto: string = '';
  descripcion: string = '';
  precio: number = 0;
  lblError: string = '';
  error: boolean = false;
  sinImagen = '../../../assets/img/noimage.png';

  //Data del hosting de imagenes
  selectedFile: File | null = null;
  imageBase64: string | null = null;
  imagen: string | null = null;
  hostImages: string = '';
  llego: boolean = false;

  constructor(
    private delivery: DeliveryService,
    router: Router,
    private activeRouter: ActivatedRoute,
    private servidor: ImagesService
  ) {
    activeRouter.params.subscribe((data: any) => {
      this.empresa = data;
    });

    delivery.empresaId(this.empresa).subscribe((data: any) => {
      this.empresa = data.Res;
      console.log(this.empresa);
    });
  }

  insertarProducto() {
    if (this.nombreProducto.trim() === '' || this.descripcion.trim() === '') {
      this.lblError = 'Llene los campos';
      this.error = true;
    } else {
      this.error = false;
      if (this.precio > 0) {
        this.error = false;
        const precioNum = this.precio.toFixed(2);
        this.precio = parseFloat(precioNum);
        if (!(this.hostImages === '')) {
          const objProducto = {
            nombre: this.nombreProducto,
            descripcion: this.descripcion,
            precio: precioNum,
            imagen: this.hostImages,
          };
          console.log(objProducto);
        } else {
          this.error = true;
          this.lblError = 'Ingrese una imagen';
        }
      } else {
        this.error = true;
        this.lblError = 'Precio invalido';
      }
    }
  }

  //Servidor de imagenes
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageBase64 = e.target.result as string;
        this.imagen = this.imageBase64.replace(
          /^data:image\/(png|jpg|jpeg);base64,/,
          ''
        );
        this.subirImagen();
      };
      reader.readAsDataURL(this.selectedFile!);
    }
  }

  async subirImagen() {
    if (this.imagen) {
      this.servidor.subirImagenes(this.imagen).subscribe((data: any) => {
        this.hostImages = data.data.url;
        console.log(data.data.url);
        this.llego = true;
      });
    } else {
      console.log('No hay imagen');
    }
  }

  ///////
}
