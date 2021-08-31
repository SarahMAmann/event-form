import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/store/app.state';

import { tap, first, takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '@app/users/models/user.model';
import { ModalComponent } from '@app/users/components/modal/modal.component';
import { from, Subject } from 'rxjs';
import {
  EditUserRequested,
  AddUserRequested,
  DeleteUserRequested
} from '@app/users/store/users.actions';
import * as UsersActions from '@app/users/store/users.actions';
import * as UsersSelectors from '@app/users/store/users.selectors';

@Component({
  selector: 'app-users-list',
  styleUrls: ['./users-list.component.scss'],
  templateUrl: 'users-list.component.html'
})
export class UsersListComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private modalService: NgbModal) { }

  users$ = this.store.select(UsersSelectors.selectUsersList);
  unsuscribe$ = new Subject<void>();

  ngOnInit() {
    this.store.dispatch(UsersActions.GetUsersRequested());
  }

  onAdd() {
    this.openModal(this.saveAdd.bind(this));
  }

  onEdit(id: number) {
    this.store
      .select(UsersSelectors.selectUserById(id))
      .pipe(
        first(),
        takeUntil(this.unsuscribe$),
        tap(user => this.openModal(this.saveEdit.bind(this), user))
      )
      .subscribe();
  }

  openModal(save: (userToSave: User) => void, user?: User) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.user = user ? user : null;
    modalRef.componentInstance.save
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(newUser => {
        save(newUser);
        modalRef.close();
      });
    modalRef.componentInstance.cancel
      .pipe(takeUntil(this.unsuscribe$))
      .subscribe(() => modalRef.close());

    from(modalRef.result).subscribe(() => modalRef.close());
  }

  saveAdd(user) {
    this.store.dispatch(AddUserRequested({ user }));
  }

  saveEdit(user) {
    this.store.dispatch(EditUserRequested({ user }));
  }

  onDelete(id: string) {
    this.store.dispatch(DeleteUserRequested({ id }));
  }

  ngOnDestroy() {
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }
}
