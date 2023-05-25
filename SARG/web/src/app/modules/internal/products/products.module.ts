import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './views/products/products.component';
import { GlobalModule } from '@globalModule/global.module';
import { SharedModule } from '@internalSharedModule/shared.module';
import { ProductsTableComponent } from './components/products-table/products-table.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsTableComponent
  ],
  imports: [
    CommonModule,
    GlobalModule,
    SharedModule,
    ProductsRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductsModule { }
