import { DeliveryService } from './../../services/delivery.service';
import { Component } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-body-empresa',
  templateUrl: './body-empresa.component.html',
  styleUrls: ['./body-empresa.component.css'],
})
export class BodyEmpresaComponent {
  empresasDB: any[] = [];
  constructor(private delivery: DeliveryService) {
    delivery.cargarEmpresas().subscribe((data: any) => {
      this.empresasDB = data;
      console.log(this.empresasDB);
    });
  }

  imprimir(id: number) {
    Swal.fire('¡Hola, mundo!', 'Esta es una alerta de ejemplo.', 'error');
  }
  //////
}
