import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permission } from '@models/auth/Permission';
import { Role } from '@models/auth/Role';
import { User } from '@models/auth/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`/roles`)
  }

  createRole(role: RoleForm): Observable<Role> {
    return this.http.post<Role>(`/roles/`, role);
  }

  editRole(id: number, role: RoleForm): Observable<Role> {
    return this.http.put<Role>(`/roles/${id}`, role);
  }

  disableRole(role: Role): Observable<string> {
    return this.http.delete<string>(`/roles/${role.id}`);
  }


  getRoleUser(user: User | number): Observable<Role[]> {
    let params = new HttpParams();
    params = params.append('id', Number.isInteger(user) ? user.toString() : (<User>user).id);
    return this.http.get<Role[]>(`/roles/user/`, { params })
  }

  getUserRolesAssignament(user: User | number): Observable<RoleAssignamet> {
    let params = new HttpParams();
    params = params.append('userId', Number.isInteger(user) ? user.toString() : (<User>user).id);
    return this.http.get<RoleAssignamet>(`/roles/assignament/`, { params })
  }

  saveUserRolesAssignament(user: User, assigned: Role[]): Observable<unknown> {
    return this.http.put<unknown>(`/roles/assignament`, { user, assigned })
  }

}

interface RoleAssignamet {
  assigned: Role[];
  unassigned: Role[]
}
interface PermissionAssignamet {
  assigned: Permission[];
  unassigned: Permission[]
}
interface RoleForm {
  id?: number | null;
  name?: string | null;
  translate?: string | null;
}
