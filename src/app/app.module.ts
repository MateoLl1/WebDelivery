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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BodyEmpresaComponent,
    RegistroEmpresaComponent,
  ],
  imports: [BrowserModule, APP_ROUTING, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
