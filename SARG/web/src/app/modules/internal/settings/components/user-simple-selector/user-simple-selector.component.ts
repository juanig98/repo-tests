import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@models/auth/User';

@Component({
  selector: 'user-simple-selector',
  templateUrl: './user-simple-selector.component.html',
  styleUrls: ['./user-simple-selector.component.scss']
})
export class UserSimpleSelectorComponent implements OnInit {


  isLoading: boolean = false;

  userSelected!: User | undefined;

  _users: User[] = [];

  @Input() showIds: boolean = false;
  @Input() users!: User[];

  @Output() eventUserSelected = new EventEmitter<User>();
  @Output() eventUserUnselected = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this._users = [...this.users];
  }

  onUserSelected() { this.eventUserSelected.emit(this.userSelected); }
  onUserUnselected() { this.userSelected = undefined; this.eventUserUnselected.emit(); }


  filter(event: any) {
    const search = event.target.value.toString().toLowerCase()
    this._users = this.users.filter(a =>
      a.firstName?.toLowerCase().includes(search)
      || a.lastName?.toLowerCase().includes(search)
      || a.username?.toLowerCase().includes(search)
      || a.id.toString().includes(search)
      )
  }


}
