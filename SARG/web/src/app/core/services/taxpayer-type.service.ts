import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaxpayerType } from '@models/billing/TaxpayerType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxpayerTypeService {

  constructor(
    private http: HttpClient
  ) { }


  getById(id: number): Observable<TaxpayerType> {
    return this.http.get<TaxpayerType>(`/taxpayer-type/${id}`)
  }

  getAll(): Observable<TaxpayerType[]> {
    return this.http.get<TaxpayerType[]>(`/taxpayer-type/`)
  }
}
