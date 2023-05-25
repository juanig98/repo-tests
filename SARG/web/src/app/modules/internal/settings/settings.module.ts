import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { UsersComponent } from './views/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesComponent } from './views/roles/roles.component';
import { SharedModule } from '@internalSharedModule/shared.module';
import { UserSimpleSelectorComponent } from './components/user-simple-selector/user-simple-selector.component';
import { RoleSimpleSelectorComponent } from './components/role-simple-selector/role-simple-selector.component';
import { GlobalModule } from '@globalModule/global.module';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { ProfileComponent } from './views/profile/profile.component';
import { PermissionsPickerComponent } from './components/permissions-picker/permissions-picker.component';
import { RolesPickerComponent } from './components/roles-picker/roles-picker.component';
import { RoleDialogComponent } from './components/role-dialog/role-dialog.component';


@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    UserSimpleSelectorComponent,
    RoleSimpleSelectorComponent,
    UserDialogComponent,
    ProfileComponent,
    PermissionsPickerComponent,
    RolesPickerComponent,
    RoleDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    GlobalModule,
    ReactiveFormsModule,
    SettingsRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SettingsModule { }
