import { DeliveryService } from './../../services/delivery.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css'],
})
export class RegistroEmpresaComponent {
  empresasDB: any[] = [];

  //Data del hosting de imagenes
  selectedFile: File | null = null;
  imageBase64: string | null = null;
  imagen: string | null = null;
  hostImages: string = '';
  llego: boolean = false;

  nombreEmpresa: string = '';
  nombreAdmin: string = '';
  ruc: string = '';
  tipoEmpresa: number = 0;
  eslogan: string = '';
  correoEmpresarial: string = '';
  password: string = '';
  error: boolean = false;
  lblError: string = '';

  constructor(
    private servidor: ImagesService,
    private delivery: DeliveryService
  ) {
    delivery.cargarTipoEmpresa().subscribe((data: any) => {
      console.log(data);
      this.empresasDB = data;
    });
  }
  ngOnInit() {
    setInterval(() => {
      this.generarCorreo();
    }, 3000);
  }

  //Objeto de envio

  btnRegistrar() {
    if (
      this.nombreEmpresa.trim() === '' ||
      this.nombreAdmin.trim() === '' ||
      this.tipoEmpresa === 0 ||
      this.eslogan.trim() === '' ||
      this.password.trim() === ''
    ) {
      this.error = true;
      this.lblError = 'Llene los campos';
    } else {
      this.error = false;
      this.lblError = '';
      if (/[^\d]/.test(this.ruc)) {
        this.error = true;
        this.lblError = 'Ruc invalido';
        return;
      }
      try {
        if (this.ruc.length === 10) {
          this.error = false;
          this.lblError = '';
          if (this.eslogan.length >= 10) {
            this.error = false;
            this.lblError = '';
            if (this.password.length >= 8) {
              this.error = false;
              this.lblError = '';

              ///REGISTRO
              if (!(this.hostImages === '')) {
                const objetoEmpresa = {
                  nombreEmpresa: this.nombreEmpresa,
                  nombreAdmin: this.nombreAdmin,
                  eslogan: this.eslogan,
                  correo: this.correoEmpresarial,
                  password: this.password,
                  ruc: this.ruc,
                  imagen: this.hostImages,
                  tipoEmpresa: +this.tipoEmpresa,
                };
                console.log(objetoEmpresa);
                this.delivery
                  .registrarEmpresa(objetoEmpresa)
                  .subscribe((data: any) => {
                    console.log(data);
                  });
                ///FIN DE REGISTRO
              } else {
                this.error = true;
                this.lblError = 'Ingrese un logo';
              }
            } else {
              this.error = true;
              this.lblError = 'Contraseña insegura';
            }
          } else {
            this.error = true;
            this.lblError = 'Eslogan muy corto';
          }
        } else {
          this.error = true;
          this.lblError = 'Ruc invalido';
        }
      } catch (error) {
        this.error = true;
        this.lblError = 'Ruc invalido';
        console.log(error);
      }
    }
  }

  generarCorreo() {
    let correo = this.nombreEmpresa.charAt(0).toLowerCase();
    correo = correo + this.nombreAdmin.toLowerCase() + this.ruc.slice(-3);
    correo = correo.replace(/\s+/g, '');
    this.correoEmpresarial = correo;
    return correo;
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

  ///////////
}
