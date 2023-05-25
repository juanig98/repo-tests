import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '@internalModule/products/services/product.service';
import { SharedService } from '@internalModule/services/shared.service';
import { Product } from '@models/products/Product';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  productSelected: Product | undefined;
  rows: number = 25;

  @Input() products: Product[] = [];
  @Input() loading: boolean = false;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
  }

  onRowSelect(): void { }

  editProduct(client: Product): void {
    // const dialog = this.dialogService.open(ProductDialogComponent, {
    //   header: 'Editar cliente', width: '70%',
    //   data: <ProductDialogConfigData>{ operation: 'update', client, return: true }
    // });

    // dialog.onClose.subscribe((_) => {
    //   if (_) {
    //     this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Producte editado exitosamente" })
    //   }
    // });
  }
  deleteProduct(client: Product): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de dar de baja este cliente?`,
      rejectLabel: "No, cancelar", acceptLabel: "Si",
      accept: () => { this.disableUserConfirm(client) },
    })
  }
  disableUserConfirm(client: Product): void {
    this.productService.delete(client.id).subscribe({
      next: response => {
        this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Producte eliminado exitosamente" })
      }, error: error => this.sharedService.setToast({ severity: 'error', summary: "Error!", detail: JSON.stringify(error) })
    });
  }

  auxclick(client: Product): void {
    window.open(`/cuentas-corrientes/${client.slug}`, "_blank")
  }
  dblclick(client: Product): void {
    this.router.navigate([`/cuentas-corrientes/${client.slug}`])
  }

  showInfo(client: Product): void {
    // this.dialogService.open(ProductInfoDialogComponent, { width: '70%', data: client, closable: true, modal: true })
  }

}
