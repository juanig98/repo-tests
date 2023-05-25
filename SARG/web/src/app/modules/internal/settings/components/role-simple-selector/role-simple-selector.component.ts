import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Role } from '@models/auth/Role';

@Component({
  selector: 'role-simple-selector',
  templateUrl: './role-simple-selector.component.html',
  styleUrls: ['./role-simple-selector.component.scss']
})
export class RoleSimpleSelectorComponent implements OnInit {

  isLoading: boolean = false;

  roleSelected!: Role | undefined;

  _roles: Role[] = [];

  @Input() showIds: boolean = false;
  @Input() roles!: Role[];

  @Output() eventRoleSelected = new EventEmitter<Role>();
  @Output() eventRoleUnselected = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this._roles = [...this.roles];
  }

  onRoleSelected() { this.eventRoleSelected.emit(this.roleSelected); }
  onRoleUnselected() { this.roleSelected = undefined; this.eventRoleUnselected.emit(); }


  filter(event: any) {
    const search = event.target.value.toString().toLowerCase()
    this._roles = this.roles.filter(a =>
      a.translate?.toLowerCase().includes(search)
      || a.id?.toString().includes(search)
    )
  }
}
