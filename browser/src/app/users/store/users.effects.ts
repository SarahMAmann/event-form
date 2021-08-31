import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserActions from '@app/users/store/users.actions';
import { UsersService } from '@app/users/services/users.service';
import { User } from '@app/users/models/user.model';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {
  constructor(
    private action$: Actions,
    private usersService: UsersService,
  ) { }

  getUsers$ = createEffect(() => this.action$.pipe(
    ofType(
      UserActions.GetUsersRequested,
      UserActions.AddUserSuccess,
      UserActions.EditUserSuccess,
      UserActions.DeleteUserSuccess
    ),
    switchMap((action) => this.usersService.mockGetUsersList$().pipe(
      map((users: Array<User>) => UserActions.GetUsersSuccess({ users })),
      catchError((error: any) => of(UserActions.GetUsersFailure({ error })))
    ))
  ));

  addUser$ = createEffect(() => this.action$.pipe(
    ofType(UsersActions.AddUserRequested),
    switchMap((action) => this.usersService.mockAddUser$(action.user).pipe(
      map((user: User) => UserActions.AddUserSuccess({ user })),
      catchError((error: any) => of(UserActions.AddUserFailure({ error })))
    ))
  ));

  editUser$ = createEffect(() => this.action$.pipe(
    ofType(UsersActions.EditUserRequested),
    switchMap((action) => this.usersService.mockEditUser$(action.user).pipe(
      map((user: User) => UserActions.EditUserSuccess({ user })),
      catchError((error: any) => of(UserActions.EditUserFailure({ error })))
    ))
  ));

  deleteUser$ = createEffect(() => this.action$.pipe(
    ofType(UserActions.DeleteUserRequested),
    switchMap((action) => this.usersService.mockDeleteUserById$(action.id).pipe(
      map((user: User) => UserActions.DeleteUserSuccess({ user })),
      catchError((error: any) => of(UserActions.DeleteUserFailure({ error })))
    ))
  ));
}