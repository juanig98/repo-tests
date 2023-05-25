import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientCurrentAccountService } from '@internalModule/clients/services/client-current-account.service';
import { Client } from '@models/client/Client';
import { ResumeCurrentAccountDTO } from '@models/client/ResumeCurrentAccount.dto';

@Component({
  templateUrl: './client-current-account.component.html',
  styleUrls: ['./client-current-account.component.scss']
})
export class ClientCurrentAccountComponent implements OnInit {

  vouchers: ResumeCurrentAccountDTO[] = [];
  client: Client | undefined;

  constructor(
    private route: ActivatedRoute,
    private clientCurrentAccountService: ClientCurrentAccountService
  ) { }

  ngOnInit(): void {

    const params = <Param>this.route.snapshot.params;
    if (params.slug) {

    }

    this.clientCurrentAccountService.getBalanceBySlug(params.slug).subscribe({
      next: response => {
        this.vouchers = response.resume;
        this.client = response.client;
      },
      error: error => {
        console.error(error);
      }
    })
  }

}

interface Param {
  slug: string;
}
