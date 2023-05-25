import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '@models/auth/Role';
import { CreateUpdateType } from '@models/commons/CreateUpdateType';
import { RoleService } from '@settingsModule/services/role.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.scss']
})
export class RoleDialogComponent implements OnInit {


  role: Role | undefined;
  operation!: CreateUpdateType;
  return: boolean = false;

  roleForm = new FormGroup({
    name: new FormControl('', Validators.required),
    translate: new FormControl('', Validators.required),
  })

  constructor(
    private messageService: MessageService,
    private roleService: RoleService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    const data = <RoleDialogConfigData>this.config.data;
    this.role = (data.role) ? data.role : undefined;
    this.operation = data.operation;
    this.return = data.return ? data.return : false;
  }

  ngOnInit(): void {

    if (this.role) {
      this.roleForm.get('name')?.setValue(this.role.name);
      this.roleForm.get('translate')?.setValue(this.role.translate);
    }

  }

  submitRoleForm() {

    if (this.operation === 'create') {
      {
        this.roleService.createRole(this.roleForm.value).subscribe({
          next: response => { this.ref.close(true) },
          error: error => { this.messageService.add({ severity: "error", summary: "Ocurrió un error", detail: error }) }
        })
      }
    }

    if (this.operation === "update" && this.role) {
      this.roleService.editRole(this.role?.id, this.roleForm.value).subscribe({
        next: response => { this.ref.close(true) },
        error: error => { this.messageService.add({ severity: "error", summary: "Ocurrió un error", detail: error }) }
      })
    }


  }
}

export interface RoleDialogConfigData {
  operation: CreateUpdateType;
  role?: Role;
  return?: boolean;
}

