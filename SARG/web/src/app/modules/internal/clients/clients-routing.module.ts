import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { ClientCurrentAccountComponent } from './views/client-current-account/client-current-account.component';
import { ClientsComponent } from './views/clients/clients.component';
import { CurrentsAccountsComponent } from './views/currents-accounts/currents-accounts.component';


const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'resumen', component: CurrentsAccountsComponent },
  { path: ':slug', component: ClientCurrentAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
