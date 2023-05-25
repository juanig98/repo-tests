import { Component, OnInit } from '@angular/core';
import { AppService } from '@internalModule/services/app.service';
import { TitleService } from 'app/core/services/title.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private title: TitleService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Home")
  }

}
