import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-informes-empresa',
  templateUrl: './informes-empresa.component.html',
  styleUrls: ['./informes-empresa.component.css'],
})
export class InformesEmpresaComponent {
  empresa: any[] = [];
  facturas: any[] = [];
  sumaFacTotal: number = 0; // Variable para almacenar la suma de fac_total

  constructor(
    private activatedRoute: ActivatedRoute,
    private delivery: DeliveryService
  ) {
    let objEmpresa = {
      id: 1,
    };
    let objEmpresa2 = {
      em_id: 0,
    };
    activatedRoute.params.subscribe((data: any) => {
      objEmpresa.id = data.id;
      objEmpresa2.em_id = data.id;
    });
    delivery.empresaId(objEmpresa).subscribe((data: any) => {
      this.empresa = data.Res;
      console.log(data.Res);
    });

    delivery.informeVentasId(objEmpresa2).subscribe((data: any) => {
      this.facturas = data.Res;
      console.log(this.facturas);

      // Calcula la suma de fac_total
      this.sumaFacTotal = this.facturas.reduce(
        (acc: number, factura: any) => acc + factura.fac_total,
        0
      );
    });
  }
}
