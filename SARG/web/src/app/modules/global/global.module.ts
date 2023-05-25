import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


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
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
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
import { FieldsetModule } from 'primeng/fieldset';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InplaceModule } from 'primeng/inplace';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { PickListModule } from 'primeng/picklist';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const primeModules = [
  CascadeSelectModule, BadgeModule, TagModule,
  SidebarModule, PickListModule, ToolbarModule, DividerModule, BreadcrumbModule, ToggleButtonModule,
  StepsModule, MenuModule, CardModule, KeyFilterModule, FileUploadModule, PanelMenuModule, MenubarModule,
  FieldsetModule, AvatarModule, AvatarGroupModule, InplaceModule, ConfirmPopupModule, OverlayPanelModule,
  InputMaskModule, InputNumberModule, TabMenuModule, AccordionModule, ProgressSpinnerModule,
  DynamicDialogModule, ConfirmDialogModule, ToastModule, BlockUIModule, PanelModule, MessagesModule, MessageModule,
  SelectButtonModule, CalendarModule, InputSwitchModule, PasswordModule, SlideMenuModule, MegaMenuModule, ListboxModule,
  InputTextModule, TableModule, ButtonModule, CheckboxModule, RadioButtonModule, DropdownModule, InputTextareaModule, TabViewModule
];

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, ...primeModules],
  providers: [
    CookieService,
    MessageService,
    ConfirmationService,
    DialogService,
  ],
  exports: [
    ...primeModules
  ]
})
export class GlobalModule { }
