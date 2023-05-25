import { Component, Input, OnInit } from '@angular/core';
import { Client } from '@models/client/Client';
import { ResumeCurrentAccountDTO } from '@models/client/ResumeCurrentAccount.dto';

@Component({
  selector: 'current-account-table',
  templateUrl: './current-account-table.component.html',
  styleUrls: ['./current-account-table.component.scss']
})
export class CurrentAccountTableComponent implements OnInit {

  @Input() client: Client | undefined;
  @Input() vouchers: ResumeCurrentAccountDTO[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  get balance() {
    if (!this.vouchers.length) return 0
    return this.vouchers[0].balance;
  }

  resume(): void {

  }
}
