import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NGL_ICON_CONFIG, NglIconConfig, NglModule } from 'ng-lightning';
import { TestComponent } from './test/test';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    ReactiveFormsModule,
    FormsModule,
    NglModule,
  ],
  providers: [
    { provide: NGL_ICON_CONFIG, useValue: <NglIconConfig>{ svgPath: '/assets/icons' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
