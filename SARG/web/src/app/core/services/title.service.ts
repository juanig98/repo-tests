import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  preTitle: string = environment.preTitle;
  postTitle: string = environment.postTitle;
  title: string = "";

  private titleSubject = new Subject<string>();
  titleObservable = this.titleSubject.asObservable();


  private titleNavbarSubject = new Subject<string>();
  titleNavbarObservable = this.titleNavbarSubject.asObservable();

  constructor(
    private titleService: Title
  ) { }

  setTitleNavbar(title: string): void { this.titleNavbarSubject.next(title); }

  setTitle(title: string): void {
    // Seteo el titulo de la barra de navegación
    this.title = title;
    this.titleSubject.next(title);
    // Seteo el titulo de la pagína/pestaña
    this.titleService.setTitle(title + this.postTitle);
  }

  // Otra implementación para el caso de solo querer cambiar el titulo de la pestaña
  setTitlePage(title: string): void {
    this.titleService.setTitle(title + this.postTitle);
  }
}
