import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaxType } from '@models/billing/TaxType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxTypeService {

  constructor(
    private http: HttpClient
  ) { }


  getById(id: number): Observable<TaxType> {
    return this.http.get<TaxType>(`/tax-type/${id}`)
  }

  getAll(): Observable<TaxType[]> {
    return this.http.get<TaxType[]>(`/tax-type/`)
  }
}
