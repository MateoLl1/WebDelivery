import { RegistroEmpresaComponent } from './../registro-empresa/registro-empresa.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryService } from './../../services/delivery.service';
import { Component } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-empresa',
  templateUrl: './info-empresa.component.html',
  styleUrls: ['./info-empresa.component.css'],
})
export class InfoEmpresaComponent {
  empresa: any[] = [];
  empresaId: any[] = [];
  tipoEmpresas: any[] = [];
  //DOM
  em_id: string = '';
  em_nombre: string = '';
  em_admin: string = '';
  em_ruc: string = '';
  em_eslogan: string = '';
  em_correo: string = '';
  em_password: string = '';
  em_imagen: string = '';
  ti_em: number = 0;
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
    private activatedRoute: ActivatedRoute,
    private delivery: DeliveryService,
    private servidor: ImagesService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((data: any) => {
      this.empresaId = data.id;
    });
    let id = {
      id: this.empresaId,
    };
    delivery.empresaId(id).subscribe((data: any) => {
      this.empresa = data.Res;
      console.log(data.Res);
      this.hostImages = data.Res[0].em_imagen;
      this.em_id = data.Res[0].em_id;
      this.em_nombre = data.Res[0].em_nombre;
      this.em_admin = data.Res[0].em_admin;
      this.em_ruc = data.Res[0].em_ruc;
      this.ti_em = data.Res[0].ti_e_id;
      this.em_eslogan = data.Res[0].em_eslogan;
      this.em_correo = data.Res[0].em_correo;
      this.em_password = data.Res[0].em_password;

      this.llego = true;
    });

    delivery.cargarTipoEmpresa().subscribe((data: any) => {
      this.tipoEmpresas = data;
    });
  }

  ngOnInit() {
    setInterval(() => {
      this.generarCorreo();
    }, 3000);
  }

  actualizarInfo() {
    if (
      this.em_id === '' ||
      this.em_nombre.trim() === '' ||
      this.em_admin.trim() === '' ||
      this.em_ruc.trim() === '' ||
      this.ti_em == 0 ||
      this.em_eslogan.trim() === '' ||
      this.em_correo.trim() === '' ||
      this.em_password.trim() === ''
    ) {
      this.error = true;
      this.lblError = 'Llene los campos';
    } else {
      this.error = false;
      this.lblError = '';
      if (/[^\d]/.test(this.em_ruc)) {
        this.error = true;
        this.lblError = 'Ruc invalido';
        return;
      }
      try {
        if (this.em_ruc.length === 10) {
          this.error = false;
          this.lblError = '';
          if (this.em_eslogan.length >= 10) {
            this.error = false;
            this.lblError = '';
            if (this.em_password.length >= 8) {
              this.error = false;
              this.lblError = '';

              ///REGISTRO
              if (!(this.hostImages === '')) {
                const objetoEmpresa = {
                  idEmpresa: this.em_id,
                  nombreEmpresa: this.em_nombre,
                  nombreAdmin: this.em_admin,
                  eslogan: this.em_eslogan,
                  correo: this.em_correo,
                  password: this.em_password,
                  ruc: this.em_ruc,
                  imagen: this.hostImages,
                  tipoEmpresa: this.ti_em,
                };
                console.log(objetoEmpresa);
                this.delivery
                  .actualizarEmpresa(objetoEmpresa)
                  .subscribe((data: any) => {
                    console.log(data.Res);
                    if (data.Res === true) {
                      Swal.fire('Informacion Actualizada!', '', 'success');
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    }
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

  eliminarEmpresa() {
    const objetoEmpresa = {
      idEmpresa: this.em_id,
    };
    // Dentro de tu componente

    Swal.fire({
      title: 'Estas seguro de borrar la Empresa?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Borrado!', 'Empresa borrada con exito', 'success');
        this.delivery
          .eliminarEmpresa(objetoEmpresa)
          .subscribe((data: any) => {});
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        }, 3000);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  generarCorreo() {
    let correo = this.em_nombre.charAt(0).toLowerCase();
    correo = correo + this.em_admin.toLowerCase() + this.em_ruc.slice(-3);
    correo = correo.replace(/\s+/g, '');
    this.em_correo = correo;
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

  //////////////
}
