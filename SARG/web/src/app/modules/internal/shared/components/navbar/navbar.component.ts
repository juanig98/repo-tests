import { Message, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/core/models/auth/User';
import { AuthService } from 'app/core/services/auth.service';
import { TitleService } from 'app/core/services/title.service';
import { NavbarService } from 'app/modules/internal/services/navbar.service';
import { SharedService } from 'app/modules/internal/services/shared.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  readonly TOAST_KEY = 'toastNavbar';
  displaySidebar = false;
  user: User | undefined;
  sidebarMenu: MenuItem[] = [];
  titleNavbar: string = "";
  titleNavbarSubs!: Subscription;
  messages: Message[] = []
  messageSubs!: Subscription;
  toasts: Message[] = []
  toastsSubs!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    // private processService: ProcessService,
    private titleService: TitleService,
    private sharedService: SharedService,
    private navbarService: NavbarService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.titleNavbarSubs = this.titleService.titleNavbarObservable.subscribe(t => this.titleNavbar = t);
    this.messageSubs = this.sharedService.messageObservable.subscribe(m => this.messages.push(m))
    this.toastsSubs = this.sharedService.toastObservable.subscribe(toast => {
      const { severity, summary, detail } = toast;
      this.messageService.add({ key: this.TOAST_KEY, severity, summary, detail });
    })
  }

  ngOnInit(): void {

    this.authService.getUser().subscribe(r => { this.user = r });

    this.navbarService.getNavbar().subscribe(r => {
      this.sidebarMenu = r
      this.sidebarMenu.push({ label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.cerrarSesion(), })
    });
  }

  cerrarSesion(): void {
    this.confirmationService.confirm({
      key: "cerrarSesion",
      message: `¿Salir?`,
      rejectLabel: "No, quedarse",
      acceptLabel: "Si, cerrar sesión",
      accept: () => { this.router.navigate(['/logout']) },
    })
  }

}
