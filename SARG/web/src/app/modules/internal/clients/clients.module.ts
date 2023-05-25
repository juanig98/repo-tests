import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './views/clients/clients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@internalSharedModule/shared.module';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { GlobalModule } from '@globalModule/global.module';
import { ClientDialogComponent } from './components/client-dialog/client-dialog.component';
import { ClientInfoDialogComponent } from './components/client-info-dialog/client-info-dialog.component';
import { CurrentsAccountsComponent } from './views/currents-accounts/currents-accounts.component';
import { ClientCurrentAccountComponent } from './views/client-current-account/client-current-account.component';
import { CurrentAccountTableComponent } from './components/current-account-table/current-account-table.component';



@NgModule({
  declarations: [
    ClientsComponent,
    ClientsTableComponent,
    ClientDialogComponent,
    ClientInfoDialogComponent,
    CurrentsAccountsComponent,
    ClientCurrentAccountComponent,
    CurrentAccountTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    GlobalModule,
    ClientsRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ClientsModule { }
