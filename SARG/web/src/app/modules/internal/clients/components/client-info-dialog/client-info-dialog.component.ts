import { Component, Input, OnInit } from '@angular/core';
import { Client } from '@models/client/Client';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'client-info-dialog',
  templateUrl: './client-info-dialog.component.html',
  styleUrls: ['./client-info-dialog.component.scss']
})
export class ClientInfoDialogComponent implements OnInit {

  @Input() client!: Client;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.client = <Client>this.config.data;

  }

  ngOnInit(): void {
  }

}
