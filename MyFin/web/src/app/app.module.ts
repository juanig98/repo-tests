import { CookieService } from 'ngx-cookie-service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEsAr from "@angular/common/locales/es-AR";

const angularModules = [
  CommonModule, BrowserAnimationsModule, ReactiveFormsModule, AppRoutingModule,
  BrowserModule, HttpClientModule, FormsModule,]

// Prime Modules
import { SlideMenuModule } from 'primeng/slidemenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PasswordModule } from 'primeng/password';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabMenuModule } from 'primeng/tabmenu';
import { AccordionModule } from 'primeng/accordion';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { PickListModule } from 'primeng/picklist';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DividerModule } from 'primeng/divider';
import { ToolbarModule } from 'primeng/toolbar';

const primeModules = [
  ToggleButtonModule, CardModule, AutoCompleteModule, DividerModule, ToolbarModule,
  InputMaskModule, InputNumberModule, TabMenuModule, AccordionModule, SidebarModule, MenubarModule, PickListModule,
  DynamicDialogModule, ConfirmDialogModule, ToastModule, BlockUIModule, PanelModule, MessagesModule, MessageModule,
  SelectButtonModule, CalendarModule, InputSwitchModule, PasswordModule, SlideMenuModule, MegaMenuModule, ListboxModule,
  InputTextModule, TableModule, ButtonModule, CheckboxModule, RadioButtonModule, DropdownModule, InputTextareaModule, TabViewModule
];

registerLocaleData(localeEsAr, "es-AR");

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/pages/login/login.component';
import { HomeComponent } from './views/pages/home/home.component';
import { NavMenuComponent } from '@components/common/nav-menu/nav-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    ...angularModules,
    ...primeModules,
  ],
  exports: [AppRoutingModule,],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService,
    CookieService,
    { provide: LOCALE_ID, useValue: 'es-AR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
