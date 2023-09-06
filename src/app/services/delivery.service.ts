import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  servidorLocal = 'http://localhost:4040';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

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
}
