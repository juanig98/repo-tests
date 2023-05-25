import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from '@models/auth/Role';

@Component({
  selector: 'roles-picker',
  templateUrl: './roles-picker.component.html',
  styleUrls: ['./roles-picker.component.scss']
})
export class RolesPickerComponent implements OnInit {
  @Input() assigned: Role[] = []
  @Input() unassigned: Role[] = []

  @Output() eventFinalized = new EventEmitter<Role[] | boolean>()

  constructor() { }

  ngOnInit(): void { }

  dismiss(): void { this.eventFinalized.emit(false); }
  save(): void { this.eventFinalized.emit(this.assigned); }
}
