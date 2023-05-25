import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '@models/products/Brand';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`/products-brands/`);
  }

  search(p: SearchParams): Observable<Brand[]> {
    let params = new HttpParams();

    if (p.search) params = params.append('search', p.search)

    return this.http.get<Brand[]>(`/products-brands/`, { params });
  }

  create(client: BrandForm): Observable<Brand> {
    return this.http.post<Brand>(`/products-brands/`, client);
  }

  update(id: number, client: BrandForm): Observable<Brand> {
    return this.http.put<Brand>(`/products-brands/${id}`, client);
  }

  delete(id: number): Observable<Brand> {
    return this.http.delete<Brand>(`/products-brands/${id}`);
  }
}
interface SearchParams {
  search: string;
}

interface BrandForm { }
