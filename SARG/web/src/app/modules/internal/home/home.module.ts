import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './views/home/home.component';
import { LogoutComponent } from './views/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@internalSharedModule/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
