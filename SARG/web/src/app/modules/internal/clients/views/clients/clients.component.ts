import { Component, OnInit } from '@angular/core';
import { ClientDialogComponent, ClientDialogConfigData } from '@internalModule/clients/components/client-dialog/client-dialog.component';
import { Client } from '@models/client/Client';
import { SharedService } from 'app/modules/internal/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  loading: boolean = false;
  clients: Client[] = [];

  constructor(
    private clientService: ClientService,
    private sharedService: SharedService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.listClients()
  }

  onSearch(search: string): void {
    // this.loading = true;
    if (!search.length) { this.listClients(); return; }
    this.clientService.search({ search }).subscribe({
      next: response => {
        // this.loading = false;
        this.clients = response;
      },
      error: error => { this.sharedService.setToastError(error) }
    })
  }

  addClient(): void {
    const dialog = this.dialogService.open(ClientDialogComponent, {
      header: 'Crear cliente', width: '70%',
      data: <ClientDialogConfigData>{ operation: 'create', return: true }
    });

    dialog.onClose.subscribe((_) => {
      if (_) {
        this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Cliente creado exitosamente" })
      }
    });
  }

  listClients(): void {
    this.loading = true;
    this.clientService.getAll().subscribe({
      next: response => {
        this.clients = response; this.loading = false;
      },
      error: error => { this.sharedService.setToastError(error) }
    })
  }
}
