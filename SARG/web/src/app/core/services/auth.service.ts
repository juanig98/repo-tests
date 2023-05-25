import { User } from 'app/core/models/auth/User';
import { LoginDTO } from 'app/core/models/auth/Login.dto';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StatusMessageResponse } from 'app/core/models/commons/StatusMessageResponse';
import { CookieService } from 'ngx-cookie-service';
import { ResponseToken } from 'app/core/models/auth/ResponseToken';
import { Profile } from 'app/core/models/auth/Profile';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly PROFILE = 'profile';
  readonly TOKEN = 'token';
  readonly TOKEN_EXPIRATION_DEFAULT = 1

  constructor(private http: HttpClient, private cookie: CookieService) { }

  /** Seteo de token en las cookies */
  public setToken(responseToken: ResponseToken) {
    const expiration = new Date();
    const tokenExpiration: number = responseToken.expiration
      ? responseToken.expiration / 3600 // viene en segundos
      : this.TOKEN_EXPIRATION_DEFAULT
    expiration.setHours(expiration.getHours() + tokenExpiration - 3); // GMT-3
    this.cookie.set(this.TOKEN, responseToken.token, expiration, "/")
  }

  /** Obtención del token desde el las cookies */
  public getToken(): string { return this.cookie.get(this.TOKEN) }


  private getProfile(): Profile | undefined {
    let profile: Profile | undefined = undefined
    const sessionProfile = sessionStorage.getItem(this.PROFILE);
    if (sessionProfile) profile = <Profile>JSON.parse(sessionProfile);
    return profile;
  }

  private setProfile(profile: Profile): Profile {
    sessionStorage.setItem(this.PROFILE, JSON.stringify(profile))
    // this.cookie.set('user', JSON.stringify(user), 1, "/")
    return profile;
  }


  /** Obtiene el usuario registrado */
  public getUser(): Observable<User | undefined> {
    const subject = new Subject<User | undefined>();
    const profile = this.getProfile();
    if (profile) return new Observable(o => { o.next(profile.user); o.complete(); });

    this.http.get<Profile>(`/app/profile`).subscribe({
      next: response => { this.setProfile(response); subject.next(response.user) },
      error: error => { subject.next(undefined) }
    })
    return subject.asObservable();
  }



  /**
   * Realiza el logueo en el backend enviando las credenciales que provea el usuario
   *
   * @param Credentials
   */
  public login(credentials: LoginDTO): Observable<ResponseToken> {
    return this.http.post<ResponseToken>(`/auth/login/`, credentials, httpOptions);
  }

  /**
   * Realiza el cierre de cesión
   *
   */
  public logout(): void {
    this.cookie.set('token', "s", 0, "/")
    this.cookie.delete('token')
    sessionStorage.setItem('profile', '');
    sessionStorage.setItem('navbar', '');
    sessionStorage.removeItem('profile');
    sessionStorage.removeItem('navbar');
  }

  /**
   * Consulta si el user está logueado en sistema
   *
   * @returns boolean
   */
  public isLogged(): Observable<boolean> {
    const subject = new Subject<boolean>();

    try {

      const token = this.getToken();

      // Si no hay token falla (retorna falso)
      if (!token) return new Observable(o => { o.next(false); o.complete(); });

      // Si el user está fuera del periodo de gracia se valida con el token
      this.http.post(`/auth/validate/`, null).subscribe({
        next: response => { // Si es válido
          subject.next(true);
        },
        error: () => { subject.next(false); } // Si no es válido
      });

      return subject.asObservable();
    } catch (error) {
      return new Observable(o => { o.next(false); o.complete(); });
    }
  }

}


