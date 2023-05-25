import { Component, OnInit } from '@angular/core';
import { Permission } from '@models/auth/Permission';
import { Role } from '@models/auth/Role';
import { RoleDialogComponent, RoleDialogConfigData } from '@settingsModule/components/role-dialog/role-dialog.component';
import { PermissionService } from '@settingsModule/services/permission.service';
import { RoleService } from '@settingsModule/services/role.service';
import { SharedService } from 'app/modules/internal/services/shared.service';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roles: Role[] = []
  roleSelected: Role | undefined;

  actionSelected: 'add' | 'edit' | 'disable' | 'permissions' | undefined;

  constructor(
    private roleService: RoleService,
    private permissionService: PermissionService,
    private sharedService: SharedService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,

  ) { }


  ngOnInit(): void { this.listRoles(); }

  listRoles(): void {
    this.roleService.getAll().subscribe({
      next: response => { this.roles = response; },
      error: error => { this.sharedService.setToast({ severity: 'error', summary: "Error!", detail: JSON.stringify(error) }) }
    })
  }

  onRoleSelected(role: Role): void { this.roleSelected = role; }
  onRoleUnselected(): void { this.roleSelected = undefined; this.actionSelected = undefined }
  addRole(): void {
    this.actionSelected = 'add';
    const dialog = this.dialogService.open(RoleDialogComponent, {
      header: 'Crear rol', width: '50%',
      data: <RoleDialogConfigData>{ operation: 'create', return: true }
    });

    dialog.onClose.subscribe((response) => {
      this.actionSelected = undefined;
      if (response) {
        this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Rol creado exitosamente" })
        this.listRoles();
      }
    });
  }

  editRole(): void {
    this.actionSelected = 'edit';
    const dialog = this.dialogService.open(RoleDialogComponent, {
      header: 'Editar usuario', width: '70%',
      data: <RoleDialogConfigData>{ operation: 'update', role: this.roleSelected, return: true }
    });

    dialog.onClose.subscribe((_) => {
      this.actionSelected = undefined;
      if (_) {
        this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Rol editado exitosamente" })
        this.listRoles();
      }
    });
  }

  disableRole(): void {
    this.actionSelected = 'disable';
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar este rol?`,
      rejectLabel: "No, cancelar", acceptLabel: "Si",
      accept: () => { this.disableRoleConfirm() },
    })
  }
  disableRoleConfirm(): void {
    this.actionSelected = undefined;
    if (this.roleSelected)
      this.roleService.disableRole(this.roleSelected).subscribe({
        next: () => {
          this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Rol eliminado exitosamente" })
          this.listRoles();
        }, error: error => this.sharedService.setToast({ severity: 'error', summary: "Error!", detail: JSON.stringify(error) })
      });
  }


  permissionsAssigned: Permission[] = []
  permissionsUnassigned: Permission[] = []
  configPermissions(): void {
    this.actionSelected = 'permissions';
    if (this.roleSelected)
      this.permissionService.getRolePermissionsAssignament(this.roleSelected).subscribe({
        next: p => { this.permissionsAssigned = p.assigned; this.permissionsUnassigned = p.unassigned; },
        error: error => { this.sharedService.setToastError(error) }
      })
  }
  savePermissionsAssigned(assigned: Permission[] | boolean): void {
    if (!this.roleSelected) return;
    if (Array.isArray(assigned))
      this.permissionService.saveRolePermissionsAssignament(this.roleSelected, assigned).subscribe({
        next: () => { this.sharedService.setToast({ severity: "success", summary: "Listo!", detail: "Permisos configurados!" }) },
        error: error => { this.sharedService.setToastError(error) }
      })
    this.actionSelected = undefined
  }


}
