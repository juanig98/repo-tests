import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '@models/client/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(`/clients/`);
  }

  search(p: SearchParams): Observable<Client[]> {
    let params = new HttpParams();

    if (p.search) params = params.append('search', p.search)

    return this.http.get<Client[]>(`/clients/`, { params });
  }

  create(client: ClientForm): Observable<Client> {
    return this.http.post<Client>(`/clients/`, client);
  }

  update(id: number, client: ClientForm): Observable<Client> {
    return this.http.put<Client>(`/clients/${id}`, client);
  }

  delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`/clients/${id}`);
  }
}
interface SearchParams {
  search: string;
}

interface ClientForm {}
