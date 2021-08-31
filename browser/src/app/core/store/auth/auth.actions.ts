import { createAction, props } from '@ngrx/store';
import { AuthCredentials, User } from '@app/core/interfaces';
import { State } from './auth.reducer';

export const TestAction = createAction(
  '[Test] Test Action - Remove Later!'
);

export const AuthInitialized = createAction(
  '[Auth] Auth Initialized',
  props<{ state: State; }>()
);

export const LoginRequested = createAction(
  '[Auth] Login Requested',
  props<{ authCredentials: AuthCredentials; }>()
);

export const LoginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User; }>()
);

export const LoginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any; }>()
);

export const LogoutRequested = createAction(
  '[Auth] Logout Requested'
);

export const LogoutSuccess = createAction(
  '[Auth] Logout Success'
);

export const LogoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: any; }>()
);

export const RegistrationRequested = createAction(
  '[Auth] Registration Requested',
  props<{ email: string; }>()
);

export const RegistrationSuccess = createAction(
  '[Auth] Registration Success'
);

export const RegistrationFailure = createAction(
  '[Auth] Registration Failure',
  props<{ error: any; }>()
);

export const ResetPasswordRequested = createAction(
  '[Auth] Reset Password Requested',
  props<{ email: string; }>()
);

export const ResetPasswordSuccess = createAction(
  '[Auth] Registration Success'
);

export const ResetPasswordFailure = createAction(
  '[Auth] Reset Password Failure',
  props<{ error: any; }>()
);
