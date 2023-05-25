import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GlobalModule } from 'app/modules/global/global.module';
import { InputSimpleSearchComponent } from './components/input-simple-search/input-simple-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';



@NgModule({
  declarations: [
    NavbarComponent,
    InputSimpleSearchComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GlobalModule
  ],
  exports: [
    NavbarComponent,
    InputSimpleSearchComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
