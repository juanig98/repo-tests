import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbLayoutModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    NbInputModule,
    NbCardModule,
    CommonModule,
    NbButtonModule,
    NbLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NbDialogModule.forChild({}),
  ],
  exports: [
    NbInputModule,
    NbCardModule,
    NbLayoutModule,
    NbButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NbDialogModule,
  ]
})
export class SharedModule { }
