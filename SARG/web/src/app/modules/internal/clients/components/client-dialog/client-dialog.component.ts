import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from '@models/client/Client';
import { CreateUpdateType } from '@models/commons/CreateUpdateType';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientService } from '@internalModule/clients/services/client.service';
import { MessageService } from 'primeng/api';
import { TaxType } from '@models/billing/TaxType';
import { SharedService } from '@internalModule/services/shared.service';
import { DocumentType } from '@models/billing/DocumentType';
import { DocumentTypeService } from 'app/core/services/document-type.service';
import { TaxpayerTypeService } from 'app/core/services/taxpayer-type.service';

@Component({
  selector: 'client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {

  client: Client | undefined;
  operation!: CreateUpdateType;
  return: boolean = false;

  clientForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    businessName: new FormControl(''),
    phoneNumber: new FormControl(''),
    phoneNumberAlt: new FormControl(''),
    addressName: new FormControl(''),
    addressNumber: new FormControl(),
    addressFlat: new FormControl(),
    addressDepartment: new FormControl(''),
    addressLocation: new FormControl(''),
    documentType: new FormControl(undefined, Validators.required),
    documentNumber: new FormControl(''),
    taxpayerType: new FormControl(undefined),
    observations: new FormControl(''),
    observationsAlt: new FormControl(''),
  })

  constructor(
    private messageService: MessageService,
    private clientService: ClientService,
    private taxpayerTypeService: TaxpayerTypeService,
    private documentTypeService: DocumentTypeService,
    private sharedService: SharedService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    const data = <ClientDialogConfigData>this.config.data;
    this.client = (data.client) ? data.client : undefined;
    this.operation = data.operation;
    this.return = data.return ? data.return : false;
  }

  ngOnInit(): void {
    this.getTaxpayerTypes();
    this.getDocumentTypes();
    this.setForm();
  }

  setForm(): void {
    if (this.client) {
      this.clientForm.get('firstName')?.setValue(this.client.firstName ? this.client.firstName : "");
      this.clientForm.get('lastName')?.setValue(this.client.lastName ? this.client.lastName : "");
      this.clientForm.get('businessName')?.setValue(this.client.businessName ? this.client.businessName : "");
      this.clientForm.get('phoneNumber')?.setValue(this.client.phoneNumber ? this.client.phoneNumber : "");
      this.clientForm.get('phoneNumberAlt')?.setValue(this.client.phoneNumberAlt ? this.client.phoneNumberAlt : "");
      this.clientForm.get('addressName')?.setValue(this.client.addressName ? this.client.addressName : "");
      this.clientForm.get('addressNumber')?.setValue(this.client.addressNumber ? this.client.addressNumber : undefined);
      this.clientForm.get('addressFlat')?.setValue(this.client.addressFlat ? this.client.addressFlat : undefined);
      this.clientForm.get('addressDepartment')?.setValue(this.client.addressDepartment ? this.client.addressDepartment : "");
      this.clientForm.get('addressLocation')?.setValue(this.client.addressLocation ? this.client.addressLocation : "");
      this.clientForm.get('documentType')?.setValue(this.client.documentType ? this.client.documentType : "");
      this.clientForm.get('documentNumber')?.setValue(this.client.documentNumber ? this.client.documentNumber : "");
      this.clientForm.get('taxpayerType')?.setValue(this.client.taxpayerType ? this.client.taxpayerType : "");
      this.clientForm.get('observations')?.setValue(this.client.observations ? this.client.observations : "");
      this.clientForm.get('observationsAlt')?.setValue(this.client.observationsAlt ? this.client.observationsAlt : "");
    }
  }
  taxpayerTypes: TaxType[] = [];
  getTaxpayerTypes(): void {
    this.taxpayerTypeService.getAll().subscribe({
      next: response => this.taxpayerTypes = response,
      error: error => this.sharedService.setToastError(error)
    })
  }
  documentTypes: DocumentType[] = [];
  getDocumentTypes(): void {
    this.documentTypeService.getAll().subscribe({
      next: response => this.documentTypes = response,
      error: error => this.sharedService.setToastError(error)
    })
  }


  submitClientForm() {

    if (this.operation === 'create') {
      {
        this.clientService.create(this.clientForm.value).subscribe({
          next: response => { this.ref.close(true) },
          error: error => { this.messageService.add({ severity: "error", summary: "Ocurrió un error", detail: error }) }
        })
      }
    }

    if (this.operation === "update" && this.client) {
      this.clientService.update(this.client.id, this.clientForm.value).subscribe({
        next: response => { this.ref.close(true) },
        error: error => { this.messageService.add({ severity: "error", summary: "Ocurrió un error", detail: error }) }
      })
    }


  }
}
export interface ClientDialogConfigData {
  operation: CreateUpdateType;
  client?: Client;
  return?: boolean;
}
