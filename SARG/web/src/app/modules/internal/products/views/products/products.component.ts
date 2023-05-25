import { Component, OnInit } from '@angular/core';
import { ProductService } from '@internalModule/products/services/product.service';
import { SharedService } from '@internalModule/services/shared.service';
import { Product } from '@models/products/Product';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private sharedService: SharedService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.listProducts()
  }

  onSearch(search: string): void {
    if (!search.length) { this.listProducts(); return; }
    this.productService.search({ search }).subscribe({
      next: response => { this.products = response; },
      error: error => { this.sharedService.setToastError(error) }
    })
  }

  addProduct(): void {
    // const dialog = this.dialogService.open(ProductDialogComponent, {
    //   header: 'Crear cliente', width: '70%',
    //   data: <ProductDialogConfigData>{ operation: 'create', return: true }
    // });

    // dialog.onClose.subscribe((_) => {
    //   if (_) {
    //     this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Producte creado exitosamente" })
    //   }
    // });
  }

  listProducts(): void {
    this.productService.getAll().subscribe({
      next: response => {
        this.products = response;
      },
      error: error => { this.sharedService.setToastError(error) }
    })
  }

}
