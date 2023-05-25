import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '@services/core/auth/auth.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): any {
    return this.auth.isLogged().pipe(
      map((response) => {
        if (response) {
          return true
        } else {
          this.router.navigate(['login'])
          return false;
        }
      }), catchError((err: any) => {
        this.router.navigate(['login'])
        return throwError(err.statusText);
      }));
  }
  canActivateChild(): any {
    return this.auth.isLogged().pipe(
      map((response) => {
        if (response) {
          return true
        } else {
          this.router.navigate(['login'])
          return false;
        }
      }), catchError((err: any) => {
        this.router.navigate(['login'])
        return throwError(err.statusText);
      }));
  }
}
