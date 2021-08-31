import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const GetUsersRequested = createAction(
  '[Users] Get Users Requested'
);

export const GetUsersSuccess = createAction(
  '[Users] Get Users Success',
  props<{ users: Array<User>; }>()
);

export const GetUsersFailure = createAction(
  '[Users] Get Users Failure',
  props<{ error: any; }>()
);

export const AddUserRequested = createAction(
  '[Users] Add User Requested',
  props<{ user: User; }>()
);

export const AddUserSuccess = createAction(
  '[Users] Add User Success',
  props<{ user: User; }>()
);

export const AddUserFailure = createAction(
  '[Users] Add User Failure',
  props<{ error: any; }>()
);

export const EditUserRequested = createAction(
  '[Users] Edit User Requested',
  props<{ user: User; }>()
);

export const EditUserSuccess = createAction(
  '[Users] Edit User Success',
  props<{ user: User; }>()
);

export const EditUserFailure = createAction(
  '[Users] Edit User Failure',
  props<{ error: any; }>()
);

export const DeleteUserRequested = createAction(
  '[Users] Delete User Requested',
  props<{ id: string; }>()
);

export const DeleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ user: User; }>()
);

export const DeleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: any; }>()
);
