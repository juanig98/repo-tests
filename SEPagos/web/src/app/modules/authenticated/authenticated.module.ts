import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LogoutComponent } from './pages/logout/logout.component';
import { NbSidebarModule } from '@nebular/theme';



@NgModule({
  declarations: [
    HomeComponent,
    LogoutComponent,

  ],
  imports: [
    NbSidebarModule,
    CommonModule,
    AuthenticatedRoutingModule,
    SharedModule
  ]
})
export class AuthenticatedModule { }
