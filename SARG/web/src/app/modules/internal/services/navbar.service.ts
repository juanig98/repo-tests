import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'app/core/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private authService: AuthService,
  ) { }


  check(): void {

  }

  getNavbar(): Observable<MenuItem[]> {
    const subject = new Subject<MenuItem[]>()
    const navbar = sessionStorage.getItem('navbar');

    if (navbar) return new Observable(o => { o.next(this.config(navbar)); o.complete(); });


    this.http.get<MenuItem[]>(`/app/navbar`).subscribe({
      next: response => {
        sessionStorage.setItem('navbar', JSON.stringify(response));
        subject.next(response)
      },
      error: error => { }
    })

    return subject.asObservable()
  }

  config(navStringify: string): MenuItem[] {
    const navbar: MenuItem[] = JSON.parse(navStringify)
    return navbar;
  }
}
