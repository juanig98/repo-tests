import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieService } from "ngx-cookie-service";
import { Observable, Subject } from "rxjs";
import { User } from "../models/User";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private cookie: CookieService
  ) { }


  getProfile(): Observable<User> {
    const subject = new Subject<User>();
    try {
      const cookieData = this.cookie.get('profile');

      let user: User | undefined = undefined;

      if (cookieData) user = JSON.parse(cookieData).user

      if (user) {

        const jwtHelper = new JwtHelperService();
        const decodedToken = jwtHelper.decodeToken(this.auth.getToken())
        if (user.id === decodedToken.id) return new Observable(o => { o.next(user); o.complete(); });
      }

      this.http.get<any>(`/profile/`, {}).subscribe(
        response => { this.cookie.set('profile', JSON.stringify(response), 1, '/'); subject.next(response.user); },
        error => { throw new Error("Ocurrió un error al buscar el perfil del usuario"); }
      );

      return subject.asObservable();
    } catch (error) {
      console.log(error);

      return new Observable(o => { o.next(undefined); o.complete(); });
    }
  }


}
