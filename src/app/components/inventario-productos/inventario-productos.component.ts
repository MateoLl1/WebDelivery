import { ImagesService } from 'src/app/services/images.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeliveryService } from './../../services/delivery.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-inventario-productos',
  templateUrl: './inventario-productos.component.html',
  styleUrls: ['./inventario-productos.component.css'],
})
export class InventarioProductosComponent {
  empresa: any[] = [];
  productos: any[] = [];
  //DOM
  idProducto: number = 0;
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
    private servidor: ImagesService,
    private location: Location
  ) {
    let id = {
      id: 0,
    };
    activeRouter.params.subscribe((data: any) => {
      this.empresa = data;
      id = {
        id: data.id,
      };
    });
    delivery.empresaId(this.empresa).subscribe((data: any) => {
      this.empresa = data.Res;
      console.log(this.empresa);
    });

    delivery.productoId(id).subscribe((data: any) => {
      this.productos = data;
      console.log(this.productos);
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
          //REGISTRO PRODUCTO
          let id = 0;
          this.activeRouter.params.subscribe((data: any) => {
            id = data.id;
          });
          const objProducto = {
            nombre: this.nombreProducto,
            descripcion: this.descripcion,
            precio: precioNum,
            imagen: this.hostImages,
            idEmpresa: id,
          };
          this.delivery.insertarProducto(objProducto).subscribe((data: any) => {
            console.log(data);
            if (data.Res === true) {
              Swal.fire('Producto Ingresado!', '', 'success');
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              Swal.fire('Error de conexion!', '', 'error');
            }
          });
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

  getIdProducto(
    id: number,
    nombre: string,
    des: string,
    precio: number,
    imagen: string
  ) {
    this.idProducto = id;
    this.nombreProducto = nombre;
    this.descripcion = des;
    this.precio = precio;
    this.hostImages = imagen;
    this.llego = true;
    console.log(this.hostImages);
  }

  actualizarProducto() {
    if (this.nombreProducto.trim() === '' || this.descripcion.trim() === '') {
      this.lblError = 'Llene los campos';
      this.error = true;
    } else {
      if (this.idProducto == 0) {
        this.lblError = 'Escoja un producto';
        this.error = true;
      } else {
        this.error = false;
        if (this.precio > 0) {
          this.error = false;
          const precioNum = this.precio.toFixed(2);
          this.precio = parseFloat(precioNum);

          if (!(this.hostImages === '')) {
            ///ACTUALIZACION
            let id = 0;
            this.activeRouter.params.subscribe((data: any) => {
              id = data.id;
            });
            const objActualizacion = {
              idProducto: this.idProducto,
              nombreProducto: this.nombreProducto,
              descripcion: this.descripcion,
              precio: precioNum,
              imagen: this.hostImages,
              idEmpresa: id,
            };
            console.log(objActualizacion);
            this.delivery
              .actualizarProducto(objActualizacion)
              .subscribe((data: any) => {
                console.log(data);
                if (data.Res === true) {
                  Swal.fire('Producto Actualizado!', '', 'success');
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                } else {
                  Swal.fire('Error de conexion!', '', 'error');
                }
              });

            /////
          } else {
            this.lblError = 'Escoja una imagen';
            this.error = true;
          }
        } else {
          this.lblError = 'Precio invalido';
          this.error = true;
        }
      }
    }
  }

  eliminarProducto() {
    if (this.idProducto == 0) {
      this.error = true;
      this.lblError = 'Escoja un producto';
    } else {
      this.error = false;
      //ELIMNAR PRODUCTO
      const objProducto = {
        idProducto: this.idProducto,
      };
      // Dentro de tu componente

      Swal.fire({
        title: 'Estas seguro de borrar el item?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          Swal.fire('Borrado!', 'Elemento borrado correctamente', 'success');
          this.delivery.eliminarProducto(objProducto).subscribe((data: any) => {
            console.log('Elemento eliminado');
            console.log(data);
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
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
