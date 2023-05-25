import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { NbButtonModule, NbCardModule, NbLayoutModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestorePasswordComponent } from './pages/restore-password/restore-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RestorePasswordComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    NbButtonModule,
    NbLayoutModule,
    NbCardModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PublicModule { }
