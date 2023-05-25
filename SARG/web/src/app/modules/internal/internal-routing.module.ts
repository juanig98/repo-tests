import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { GuestGuard } from 'app/core/guards/guest.guard';

const routes: Routes = [

  { path: '', canActivateChild: [AuthGuard], loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'clientes', pathMatch: 'full', canActivateChild: [AuthGuard], loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
  { path: 'cuentas-corrientes', pathMatch: 'prefix', canActivateChild: [AuthGuard], loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule) },
  { path: 'configuraciones', canActivateChild: [AuthGuard], loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'inventario', canActivateChild: [AuthGuard], loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'productos', canActivateChild: [AuthGuard], loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },

]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalRoutingModule { }
