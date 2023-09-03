import { Component } from '@angular/core';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.css'],
})
export class RegistroEmpresaComponent {
  nombreEmpresa: string = '';
  nombreAdmin: string = '';
  ruc: string = '';
  tipoEmpresa: string = '';
  eslogan: string = '';
  correoEmpresarial: string = '';
  password: string = '';
  error: boolean = false;
  lblError: string = '';

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

  ///////////
}
