import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './modules/public/public.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeEsAr from "@angular/common/locales/es-AR";
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ApiPrefixInterceptor } from './core/interceptors/api-prefix.interceptor';
import { InternalModule } from './modules/internal/internal.module';
import { GlobalModule } from './modules/global/global.module';
import { TranslateModule } from '@ngx-translate/core';

registerLocaleData(localeEsAr, "es-AR");

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PublicModule,
    InternalModule,
    GlobalModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: '$' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
