import { route_api } from '@config/routes';
import { User } from '@models/Auth/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  })
};

const httpOptionsFormUrlencoded = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user!: User;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  /** Seteo de token en las cookies */
  public setToken(token: string) { this.cookie.set('token', token, 1, "/") }

  /** Obtención del token desde el las cookies */
  public getToken(): any { return this.cookie.get('token') }

  public getHttpHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    }
  }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    })
  }

  // /** Obtiene el usuario registrado */
  // public getUser(): User {
  //   return this.user
  //   // this.existUser().subscribe(user => { return user })
  // }

  // /** Define el usuario */
  // private setUser(usuario: any): User {

  //   this.user = usuario;
  //   return this.user;
  //   // return new User(data.idUserModoConcordia, data.apellido, data.condicion == "1" ? "Residente" : "Turista", data.documento, data.email, data.estado, data.fechaAlta, data.fechaNacimiento, data.localidad, data.nombre, data.pais, data.provincia, data.sexo, data.telefono, DocumentoTipoInit.getAll().find(d => d.cod == data.tipoDocumento), new Date())
  // }

  /**
   * Realiza el logueo en el backend enviando las credenciales que provea el usuario
   *
   * @param Credentials
   */
  public login(credentials: LoginDTO): Observable<Token> {
    return this.http.post<Token>(`${route_api}/auth/login`, credentials, httpOptions);
  }

  /**
   * Realiza el cierre de cesión
   *
   */
  public logout(): void {
    this.cookie.set('token', "", new Date(), "/")
  }

  /**
   * Consulta si el usuario está logueado en sistema
   *
   * @returns boolean
   */
  public isLogged(): Observable<boolean> {
    const subject = new Subject<boolean>();

    try {

      const token = this.getToken();

      // Si no hay token falla (retorna falso)
      if (!token) return new Observable(o => { o.next(false); o.complete(); });


      // Si el usuario está fuera del periodo de gracia se valida con el token
      this.http.post<any>(`${route_api}/auth/validate/`, {}, this.getHttpHeaders()).subscribe(
        response => { subject.next(true); }, // Si es válido
        error => { subject.next(false); } // Si no es válido
      );

      return subject.asObservable();
    } catch (error) {
      return new Observable(o => { o.next(false); o.complete(); });
    }
  }
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface Token {
  token: string;
}
