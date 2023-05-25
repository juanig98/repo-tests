import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/auth/User';
import { StatusMessageResponse } from '@models/commons/StatusMessageResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`/users`)
  }

  createUser(user: UserForm): Observable<User> {
    return this.http.post<User>(`/users/`, user);
  }

  editUser(id: number, user: UserForm): Observable<User> {
    return this.http.put<User>(`/users/${id}`, user);
  }

  disableUser(user: User): Observable<User> {
    return this.http.delete<User>(`/users/${user.id}`);
  }

  enableUser(user: User): Observable<User> {
    return this.http.put<User>(`/users/enable/${user.id}/`, { user });
  }

}

interface UserForm { }
