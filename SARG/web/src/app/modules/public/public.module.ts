import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PublicRoutingModule } from './public-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalModule } from 'app/modules/global/global.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    GlobalModule,
    ReactiveFormsModule,
    FormsModule,
    PublicRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PublicModule { }
