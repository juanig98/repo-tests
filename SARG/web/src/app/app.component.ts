import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({ selector: 'app-root', template: "<router-outlet></router-outlet>" })
export class AppComponent implements OnInit {

  constructor(
    private config: PrimeNGConfig,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.translateService.setDefaultLang('es');
  }

  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }
}
