import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@models/products/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`/products-categories/`);
  }

  search(p: SearchParams): Observable<Category[]> {
    let params = new HttpParams();

    if (p.search) params = params.append('search', p.search)

    return this.http.get<Category[]>(`/products-categories/`, { params });
  }

  create(client: CategoryForm): Observable<Category> {
    return this.http.post<Category>(`/products-categories/`, client);
  }

  update(id: number, client: CategoryForm): Observable<Category> {
    return this.http.put<Category>(`/products-categories/${id}`, client);
  }

  delete(id: number): Observable<Category> {
    return this.http.delete<Category>(`/products-categories/${id}`);
  }
}
interface SearchParams {
  search: string;
}

interface CategoryForm { }
