import { Routes, RouterModule } from '@angular/router';
import { RegistroEmpresaComponent } from './components/registro-empresa/registro-empresa.component';
import { BodyEmpresaComponent } from './components/body-empresa/body-empresa.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { InventarioProductosComponent } from './components/inventario-productos/inventario-productos.component';

export const APP_ROUTES: Routes = [
  { path: 'registroEm', component: RegistroEmpresaComponent },
  { path: 'dashboard', component: BodyEmpresaComponent },
  { path: 'empresa/:id', component: EmpresaComponent },
  { path: 'productos/:id', component: InventarioProductosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
