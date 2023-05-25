import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/modules/internal/services/app.service';
import { SharedService } from 'app/modules/internal/services/shared.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private appService: AppService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  loading = false;
  reloadData(): void {
    this.loading = true;
    this.appService.reloadData().subscribe({
      next: r => {
        this.sharedService.setToast({ severity: "info", summary: "Datos actualizados" })
        this.loading = false;
      },
      error: e => {
        this.sharedService.setToastError(e)
        this.loading = false;
      }
    })
  }

}
