import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@app/users/models/user.model';

@Component({
  selector: 'app-users-list-table',
  templateUrl: './users-list-table.component.html',
  styleUrls: ['./users-list-table.component.css']
})
export class UsersListTableComponent implements OnInit {
  constructor() {}

  @Input() users: Array<User>;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  ngOnInit() {}

  onEdit(id: number) {
    this.edit.emit(id);
  }

  onDelete(id: number) {
    this.delete.emit(id);
  }
}
