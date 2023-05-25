import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { User } from 'src/app/core/models/User';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user!: User;

  constructor(
    private profileService: ProfileService,
    private sidebarService: NbSidebarService
  ) {
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(response => this.user = response);
  }

  toggle() {
    this.sidebarService.toggle();
  }

}
