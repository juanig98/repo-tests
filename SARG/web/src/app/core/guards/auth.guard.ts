import { AuthService } from 'app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AppService } from 'app/modules/internal/services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    public auth: AuthService,
    public router: Router,
    private appService: AppService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isLogged().pipe(
      map((response) => {
        if (response) {
          return true
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }), catchError((err: Response) => {
        this.router.navigate(['/login']);
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
          return true
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }), catchError((err: Response) => {
        this.router.navigate(['/login']);
        return throwError(err.statusText);
      }));
  }

}
