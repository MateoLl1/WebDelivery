import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { APP_ROUTING } from './app.route';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyEmpresaComponent } from './components/body-empresa/body-empresa.component';
import { RegistroEmpresaComponent } from './components/registro-empresa/registro-empresa.component';

//Services
import { HttpClientModule } from '@angular/common/http';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { InventarioProductosComponent } from './components/inventario-productos/inventario-productos.component';
import { InfoEmpresaComponent } from './components/info-empresa/info-empresa.component';
import { InformesEmpresaComponent } from './components/informes-empresa/informes-empresa.component';
import { NoImagenPipe } from './pipes/no-imagen.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BodyEmpresaComponent,
    RegistroEmpresaComponent,
    EmpresaComponent,
    InventarioProductosComponent,
    InfoEmpresaComponent,
    InformesEmpresaComponent,
    NoImagenPipe,
  ],
  imports: [BrowserModule, APP_ROUTING, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
