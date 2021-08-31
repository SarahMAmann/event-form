import { createReducer, on, ActionCreator } from '@ngrx/store';
import * as UserActions from './users.actions';
import { User } from '../models/user.model';

export const usersFeatureKey = 'users';

export interface State {
  loading: boolean;
  error: any;
  users: User[];
}

export const initialState: State = {
  loading: false,
  error: null,
  users: []
};

const userReducer = createReducer(
  initialState,
  on(
    UserActions.GetUsersRequested,
    UserActions.AddUserRequested,
    UserActions.EditUserRequested,
    UserActions.DeleteUserRequested,
    (state, action) => ({
      ...state,
      loading: false
    })),
  on(UserActions.GetUsersSuccess, (state, action) => ({
    ...state,
    loading: false,
    users: action.users
  })),
  on(
    UserActions.AddUserSuccess,
    UserActions.EditUserSuccess,
    UserActions.DeleteUserSuccess,
    (state, action) => ({
      ...state,
      loading: false
    })),
  on(
    UserActions.GetUsersFailure,
    UserActions.AddUserFailure,
    UserActions.EditUserFailure,
    UserActions.DeleteUserFailure,
    (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    })
  )
);

export function reducer(state: State | undefined, action: ActionCreator) {
  return userReducer(state, action);
}
