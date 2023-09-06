import { Router } from '@angular/router';
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
  constructor(private delivery: DeliveryService, private router: Router) {
    delivery.cargarEmpresas().subscribe((data: any) => {
      this.empresasDB = data;
      console.log(this.empresasDB);
    });
  }

  navegarEmpresa(id: number) {
    this.router.navigate(['empresa', id]);
  }

  //////
}
