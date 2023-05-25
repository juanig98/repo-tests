import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@models/products/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`/products/`);
  }

  search(p: SearchParams): Observable<Product[]> {
    let params = new HttpParams();

    if (p.search) params = params.append('search', p.search)

    return this.http.get<Product[]>(`/products/`, { params });
  }

  create(client: ProductForm): Observable<Product> {
    return this.http.post<Product>(`/products/`, client);
  }

  update(id: number, client: ProductForm): Observable<Product> {
    return this.http.put<Product>(`/products/${id}`, client);
  }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`/products/${id}`);
  }
}
interface SearchParams {
  search: string;
}

interface ProductForm { }
