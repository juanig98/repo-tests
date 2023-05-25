import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permission } from '@models/auth/Permission';
import { Role } from '@models/auth/Role';
import { User } from '@models/auth/User';
import { forkJoin, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`/permissions`)
  }

  getPermissionUser(user: User | number): Observable<Permission[]> {
    let params = new HttpParams();
    params = params.append('id', Number.isInteger(user) ? user.toString() : (<User>user).id);
    return this.http.get<Permission[]>(`/permissions/user/`, { params })
  }

  getUserPermissionsAssignament(user: User | number): Observable<PermissionAssignamet> {
    let params = new HttpParams();
    params = params.append('userId', Number.isInteger(user) ? user.toString() : (<User>user).id);
    return this.http.get<PermissionAssignamet>(`/permissions/user-assignament/`, { params })
  }

  saveUserPermissionsAssignament(user: User, assigned: Permission[]): Observable<unknown> {
    return this.http.put<unknown>(`/permissions/user-assignament/`, { user, assigned })
  }

  getRolePermissionsAssignament(role: Role | number): Observable<PermissionAssignamet> {
    let params = new HttpParams();
    params = params.append('roleId', Number.isInteger(role) ? role.toString() : (<Role>role).id);
    return this.http.get<PermissionAssignamet>(`/permissions/role-assignament/`, { params })
  }

  saveRolePermissionsAssignament(role: Role, assigned: Permission[]): Observable<unknown> {
    return this.http.put<unknown>(`/permissions/role-assignament/`, { role, assigned })
  }
}

interface PermissionAssignamet {
  assigned: Permission[];
  unassigned: Permission[]
}
