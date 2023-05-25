import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentType } from '@models/billing/DocumentType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor(
    private http: HttpClient
  ) { }


  getById(id: number): Observable<DocumentType> {
    return this.http.get<DocumentType>(`/document-type/${id}`)
  }

  getAll(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(`/document-type/`)
  }
}
