import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthPermissionService {

  constructor(
    private http: HttpClient
  ) { }

  getPermissions(): Observable<number[]>{
    return this.http.get<number[]>(`/auth/permissions`)
  }
}
