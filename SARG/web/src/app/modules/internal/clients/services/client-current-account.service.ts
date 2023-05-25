import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '@models/client/Client';
import { ResumeCurrentAccountDTO } from '@models/client/ResumeCurrentAccount.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientCurrentAccountService {

  constructor(
    private http: HttpClient,
  ) { }

  getBalanceBySlug(slug: string): Observable<ResumeClient> {
    return this.http.get<ResumeClient>(`/currents-accounts/${slug}/`)
  }
}

interface ResumeClient{
  resume: ResumeCurrentAccountDTO[];
  client: Client;
}
