import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  online: string = 'https://mateoservice.onrender.com';
  local: string = 'https://mateoservice.onrender.com';
  servidorLocal = `${this.online}`;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  //EMPRESAS CRUD

  cargarTipoEmpresa() {
    return this.http.post(`${this.servidorLocal}/tipoEmpresa`, null);
  }

  cargarEmpresas() {
    return this.http.post(`${this.servidorLocal}/cargarEmpresa`, null);
  }

  registrarEmpresa(data: any) {
    return this.http.post(`${this.servidorLocal}/registrarEmpresa`, data, {
      headers: this.headers,
    });
  }

  empresaId(data: any) {
    return this.http.post(`${this.servidorLocal}/idEmpresa`, data, {
      headers: this.headers,
    });
  }

  actualizarEmpresa(data: any) {
    return this.http.post(`${this.servidorLocal}/actualizarEmpresa`, data, {
      headers: this.headers,
    });
  }
  eliminarEmpresa(data: any) {
    return this.http.post(`${this.servidorLocal}/eliminarEmpresa`, data, {
      headers: this.headers,
    });
  }

  informeVentasId(data: any) {
    return this.http.post(`${this.servidorLocal}/facturaIdEmpresa`, data, {
      headers: this.headers,
    });
  }

  ///PRODUCTOS CRUD
  productoId(data: any) {
    return this.http.post(`${this.servidorLocal}/idProductos`, data, {
      headers: this.headers,
    });
  }
  insertarProducto(data: any) {
    return this.http.post(`${this.servidorLocal}/insertarProducto`, data, {
      headers: this.headers,
    });
  }

  actualizarProducto(data: any) {
    return this.http.post(`${this.servidorLocal}/actualizarProducto`, data, {
      headers: this.headers,
    });
  }
  eliminarProducto(data: any) {
    return this.http.post(`${this.servidorLocal}/eliminarProducto`, data, {
      headers: this.headers,
    });
  }
}
