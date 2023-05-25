
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { AuthService } from '@services/core/auth/auth.service';
import { User } from '@models/Auth/User';
import { logo } from '@config/app';
import { routes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuComponent implements OnInit {

  displayToolbar: boolean = false;
  blockToolbar: boolean = false;

  logo: string = logo;

  displaySidebar = false;
  user!: User;
  items: MenuItem[] = [];
  sidebarMenu: ItemSidebar[] = [];
  rightMenuItems: MenuItem[]


  constructor(
    private authService: AuthService,
    private router: Router,
    private confirmService: ConfirmationService
  ) {
    this.blockToolbar = router.url == '/home';

    this.rightMenuItems = [{ label: "Cerrar sesión", routerLink: "/logout" }]

    routes.find(r => r.data?.isFather)?.children?.map(route => {
      if (route.data?.displayNavbar) this.sidebarMenu.push({ label: route.data.titleNavbar, link: `/${route.path}`, icon: route.data.iconNavbar })
    })
  }

  ngOnInit(): void { }

  onHideSidebar(): void { if (this.router.url != '/home') this.blockToolbar = false; }

  logout(): void {
    this.confirmService.confirm({
      header: "¿Cerrar sesión?",
      closeOnEscape: false,
      acceptLabel: "Si, salir",
      accept: () => {
        this.router.navigate(['/logout'])
      },
      reject: () => { if (this.router.url != '/home') this.blockToolbar = false; }
    })
  }
}


interface ItemSidebar {
  permission?: number
  label: string;
  link: string;
  icon?: string;
  children?: ItemSidebar[];
}
