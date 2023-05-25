import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '@internalModule/clients/services/client.service';
import { SharedService } from '@internalModule/services/shared.service';
import { Client } from '@models/client/Client';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ClientDialogComponent, ClientDialogConfigData } from '../client-dialog/client-dialog.component';
import { ClientInfoDialogComponent } from '../client-info-dialog/client-info-dialog.component';

@Component({
  selector: 'clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit {

  clientSelected: Client | undefined;
  rows: number = 25;

  @Input() clients: Client[] = [];
  @Input() loading: boolean = false;

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private clientService: ClientService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
  }

  onRowSelect(): void { }

  editClient(client: Client): void {
    const dialog = this.dialogService.open(ClientDialogComponent, {
      header: 'Editar cliente', width: '70%',
      data: <ClientDialogConfigData>{ operation: 'update', client, return: true }
    });

    dialog.onClose.subscribe((_) => {
      if (_) {
        this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Cliente editado exitosamente" })
      }
    });
  }
  deleteClient(client: Client): void {
    this.confirmationService.confirm({
      message: `¿Está seguro de dar de baja este cliente?`,
      rejectLabel: "No, cancelar", acceptLabel: "Si",
      accept: () => { this.disableUserConfirm(client) },
    })
  }
  disableUserConfirm(client: Client): void {
    this.clientService.delete(client.id).subscribe({
      next: response => {
        this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Cliente eliminado exitosamente" })
      }, error: error => this.sharedService.setToast({ severity: 'error', summary: "Error!", detail: JSON.stringify(error) })
    });
  }

  auxclick(client: Client): void {
    window.open(`/cuentas-corrientes/${client.slug}`, "_blank")
  }
  dblclick(client: Client): void {
    this.router.navigate([`/cuentas-corrientes/${client.slug}`])
  }

  showInfo(client: Client): void {
    this.dialogService.open(ClientInfoDialogComponent, { width: '70%', data: client, closable: true, modal: true })
  }
}
