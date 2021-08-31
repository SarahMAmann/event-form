import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '@app/core/interfaces';

export const authFeatureKey = 'auth';

export interface State {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
}

export const initialState: State = {
  isAuthenticated: false,
  loading: false,
  user: null
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.LoginRequested, (state, action) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.LoginSuccess, (state, action) => ({
    ...state,
    loading: false,
    isAuthenticated: true,
    user: action.user
  })),
  on(AuthActions.LoginFailure, (state, action) => ({
    ...state,
    loading: false
  })),
  on(AuthActions.LogoutRequested, (state, action) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.LogoutSuccess, (state, action) => ({
    ...state,
    loading: false
  })),
  on(AuthActions.LogoutFailure, (state, action) => ({
    ...state,
    loading: false
  })),
  on(AuthActions.RegistrationRequested, (state, action) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.RegistrationSuccess, (state, action) => ({
    ...state,
    loading: false
  })),
  on(AuthActions.RegistrationFailure, (state, action) => ({
    ...state,
    loading: false
  })),
  on(AuthActions.ResetPasswordRequested, (state, action) => ({
    ...state,
    loading: true
  })),
  on(AuthActions.ResetPasswordSuccess, (state, action) => ({
    ...state,
    loading: false
  })),
  on(AuthActions.ResetPasswordFailure, (state, action) => ({
    ...state,
    loading: false
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}

