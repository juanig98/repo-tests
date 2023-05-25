import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from '@models/auth/User';
import { CreateUpdateType } from '@models/commons/CreateUpdateType';

@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent implements OnInit {

  user: User | undefined;
  operation!: CreateUpdateType;
  return: boolean = false;

  resetPassword: boolean = false;

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl(''),
    resetPassword: new FormControl(false)
  })

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    const data = <UserDialogConfigData>this.config.data;
    this.user = (data.user) ? data.user : undefined;
    this.operation = data.operation;
    this.return = data.return ? data.return : false;
  }

  ngOnInit(): void {

    if (this.user) {
      this.userForm.get('username')?.setValue(this.user.username);
      this.userForm.get('firstName')?.setValue(this.user.firstName);
      this.userForm.get('lastName')?.setValue(this.user.lastName);
      this.userForm.get('email')?.setValue(this.user.email);
    }

  }

  submitUserForm() {

    if (this.operation === 'create') {
      {
        this.userService.createUser(this.userForm.value).subscribe({
          next: response => { this.ref.close(true) },
          error: error => { this.messageService.add({ severity: "error", summary: "Ocurrió un error", detail: error }) }
        })
      }
    }

    if (this.operation === "update" && this.user) {
      this.userForm.get('resetPassword')?.setValue(this.resetPassword);
      this.userService.editUser(this.user?.id, this.userForm.value).subscribe({
        next: response => { this.ref.close(true) },
        error: error => { this.messageService.add({ severity: "error", summary: "Ocurrió un error", detail: error }) }
      })
    }


  }
}

export interface UserDialogConfigData {
  operation: CreateUpdateType;
  user?: User;
  return?: boolean;
}
