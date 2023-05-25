import { Injectable } from "@angular/core";
import { AuthService } from "app/core/services/auth.service";
import { forkJoin, Observable, Subject } from "rxjs";
import { NavbarService } from "./navbar.service";

@Injectable({ providedIn: 'root' })
export class AppService {

  constructor(
    private navbarService: NavbarService,
    private authService: AuthService,
  ) { }

  reloadData(): Observable<boolean[]> {
    const subject = new Subject<boolean[]>();

    sessionStorage.setItem('profile', '')
    sessionStorage.setItem('navbar', '')
    sessionStorage.removeItem('profile')
    sessionStorage.removeItem('navbar')

    forkJoin([this.authService.getUser(), this.navbarService.getNavbar()]).subscribe({
      next: ([result1, result2]) => {
        subject.next([!!result1, !!result2])
      },
      error: (err) => subject.next([false, false])
    })

    return subject.asObservable();
  }
}
