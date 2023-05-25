
import { Component, OnInit } from '@angular/core';
import { UserService } from '@settingsModule/services/user.service';
import { User } from '@models/auth/User';
import { DialogService } from 'primeng/dynamicdialog';
import { UserDialogComponent, UserDialogConfigData } from '@settingsModule/components/user-dialog/user-dialog.component';
import { SharedService } from 'app/modules/internal/services/shared.service';
import { ConfirmationService } from 'primeng/api';
import { PermissionService } from '@settingsModule/services/permission.service';
import { Permission } from '@models/auth/Permission';
import { Role } from '@models/auth/Role';
import { RoleService } from '@settingsModule/services/role.service';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  userSelected: User | undefined;

  actionSelected: 'add' | 'edit' | 'disable' | 'permissions' | 'roles' | undefined;

  constructor(
    private userService: UserService,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private dialogService: DialogService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void { this.listUsers(); }

  listUsers(): void {
    this.userService.getUsers().subscribe({
      next: response => { this.users = response; },
      error: error => { this.sharedService.setToast({ severity: 'error', summary: "Error!", detail: JSON.stringify(error) }) }
    })
  }

  get userDisabled(): boolean { return this.userSelected?.status === 'BA' }
  onUserSelected(user: User): void { this.userSelected = user; }
  onUserUnselected(): void { this.userSelected = undefined; this.actionSelected = undefined }
  addUser(): void {
    this.actionSelected = 'add';
    const dialog = this.dialogService.open(UserDialogComponent, {
      header: 'Crear usuario', width: '70%',
      data: <UserDialogConfigData>{ operation: 'create', return: true }
    });

    dialog.onClose.subscribe((response) => {
      this.actionSelected = undefined;
      if (response) {
        this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Usuario creado exitosamente" })
        this.listUsers();
      }
    });
  }

  editUser(): void {
    this.actionSelected = 'edit';
    const dialog = this.dialogService.open(UserDialogComponent, {
      header: 'Editar usuario', width: '70%',
      data: <UserDialogConfigData>{ operation: 'update', user: this.userSelected, return: true }
    });

    dialog.onClose.subscribe((_) => {
      this.actionSelected = undefined;
      if (_) {
        this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Usuario editado exitosamente" })
        this.listUsers();
      }
    });
  }
  enableUser(): void {
    this.actionSelected = undefined;
    if (this.userSelected)
      this.userService.enableUser(this.userSelected).subscribe({
        next: response => {
          this.userSelected = response
          this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Usuario nuevamente habilitado!" })
          this.listUsers();
        }, error: error => this.sharedService.setToast({ severity: 'error', summary: "Error!", detail: JSON.stringify(error) })
      });
  }

  disableUser(): void {
    this.actionSelected = 'disable';
    this.confirmationService.confirm({
      message: `¿Está seguro de dar de baja este usuario?`,
      rejectLabel: "No, cancelar", acceptLabel: "Si",
      accept: () => { this.disableUserConfirm() },
    })
  }
  disableUserConfirm(): void {
    this.actionSelected = undefined;
    if (this.userSelected)
      this.userService.disableUser(this.userSelected).subscribe({
        next: response => {
          this.userSelected = response
          this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Usuario deshabilitado exitosamente" })
          this.listUsers();
        }, error: error => this.sharedService.setToast({ severity: 'error', summary: "Error!", detail: JSON.stringify(error) })
      });
  }


  permissionsAssigned: Permission[] = []
  permissionsUnassigned: Permission[] = []
  configPermissions(): void {
    this.actionSelected = 'permissions';
    if (this.userSelected)
      this.permissionService.getUserPermissionsAssignament(this.userSelected).subscribe({
        next: p => { this.permissionsAssigned = p.assigned; this.permissionsUnassigned = p.unassigned; },
        error: error => { this.sharedService.setToastError(error) }
      })
  }
  savePermissionsAssigned(assigned: Permission[] | boolean): void {
    if (!this.userSelected) return;
    if (Array.isArray(assigned))
      this.permissionService.saveUserPermissionsAssignament(this.userSelected, assigned).subscribe({
        next: () => { this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Permisos configurados!" }) },
        error: error => { this.sharedService.setToastError(error) }
      })
    this.actionSelected = undefined
  }

  rolesAssigned: Role[] = []
  rolesUnassigned: Role[] = []
  configRoles(): void {
    this.actionSelected = 'roles';
    if (this.userSelected)
      this.roleService.getUserRolesAssignament(this.userSelected).subscribe({
        next: r => { this.rolesAssigned = r.assigned; this.rolesUnassigned = r.unassigned; },
        error: error => { this.sharedService.setToastError(error) }
      })
  }
  saveRoleAssigned(assigned: Permission[] | boolean): void {
    if (!this.userSelected) return;
    if (Array.isArray(assigned))
      this.roleService.saveUserRolesAssignament(this.userSelected, assigned).subscribe({
        next: () => { this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Roles configurados!" }) },
        error: error => { this.sharedService.setToastError(error) }
      })
    this.actionSelected = undefined
  }


}
