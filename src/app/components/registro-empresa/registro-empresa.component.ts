import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css'],
})
export class RegistroEmpresaComponent {
  //Data del hosting de imagenes
  selectedFile: File | null = null;
  imageBase64: string | null = null;
  imagen: string | null = null;
  hostImages: string = '';
  llego: boolean = false;

  nombreEmpresa: string = '';
  nombreAdmin: string = '';
  ruc: string = '';
  tipoEmpresa: string = '';
  eslogan: string = '';
  correoEmpresarial: string = '';
  password: string = '';
  error: boolean = false;
  lblError: string = '';

  constructor(private servidor: ImagesService) {}
  ngOnInit() {
    setInterval(() => {
      this.generarCorreo();
    }, 3000);
  }

  btnRegistrar() {
    if (
      this.nombreEmpresa.trim() === '' ||
      this.nombreAdmin.trim() === '' ||
      this.tipoEmpresa.trim() === '' ||
      this.tipoEmpresa.trim() === '' ||
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
