import { DeliveryService } from './../../services/delivery.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent {
  idEmpresa: any[] = [];
  empresa: any[] = [];
  constructor(
    private route: Router,
    private _activatedRoute: ActivatedRoute,
    private delivery: DeliveryService
  ) {
    _activatedRoute.params.subscribe((data: any) => {
      this.idEmpresa = data;
    });
    delivery.empresaId(this.idEmpresa).subscribe((data: any) => {
      console.log(data.Res);
      this.empresa = data.Res;
    });
  }

  navegarInventarioProducto() {
    this._activatedRoute.params.subscribe((data: any) => {
      this.route.navigate(['productos', data.id]);
    });
  }

  navegarInfoEmpresa() {
    this._activatedRoute.params.subscribe((data: any) => {
      console.log(data.id);
      this.route.navigate(['infoEmpresa', data.id]);
    });
  }
}
