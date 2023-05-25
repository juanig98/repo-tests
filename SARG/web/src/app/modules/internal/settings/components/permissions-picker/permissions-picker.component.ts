import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Permission } from '@models/auth/Permission';

@Component({
  selector: 'permissions-picker',
  templateUrl: './permissions-picker.component.html',
  styleUrls: ['./permissions-picker.component.scss']
})
export class PermissionsPickerComponent implements OnInit {

  @Input() assigned: Permission[] = []
  @Input() unassigned: Permission[] = []

  @Output() eventFinalized = new EventEmitter<Permission[] | boolean>()

  constructor() { }

  ngOnInit(): void { }

  dismiss(): void { this.eventFinalized.emit(false); }
  save(): void { this.eventFinalized.emit(this.assigned); }
}
