import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from 'app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate, CanActivateChild {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isLogged().pipe(
      map((response) => {
        if (response) {
          this.router.navigate(['/home']);
          return false;
        } else {
          return true;
        }
      }), catchError((err: Response) => {
        return throwError(err.statusText);
      }));
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isLogged().pipe(
      map((response) => {
        if (response) {
          this.router.navigate(['/home']);
          return false;
        } else {
          return true;
        }
      }), catchError((err: Response) => {
        return throwError(err.statusText);
      }));
  }
}
