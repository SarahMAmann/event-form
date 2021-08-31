import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { initialState } from '../auth/auth.reducer';
import { AuthenticationService } from '@app/core/services';
import { User } from '@app/core/interfaces';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService
  ) { }

  init$ = createEffect(() => {
    const user = sessionStorage.getItem('user');

    return of(AuthActions.AuthInitialized({
      state: {
        ...initialState,
        user: user ? JSON.parse(user) : null,
        isAuthenticated: user ? true : false
      }
    }));
  });

  // To display router effects, remove later
  test$ = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    map((routerNavigationAction: RouterNavigationAction) => routerNavigationAction.payload),
    filter(payload => payload.routerState.root.queryParams.test),
    map(() => AuthActions.TestAction())
  ));

  // login$ = createEffect(() => this.actions$.pipe(
  //   ofType(AuthActions.LoginRequested),
  //   switchMap((action) => this.authenticationService.mockLogin$(action.authCredentials).pipe(
  //     map((user: User) => AuthActions.LoginSuccess({ user })),
  //     catchError((error: any) => of(AuthActions.LoginFailure({ error })))
  //   ))
  // ));

  // logout$ = createEffect(() => this.actions$.pipe(
  //   ofType(AuthActions.LogoutRequested),
  //   switchMap(() => this.authenticationService.mockLogout$().pipe(
  //     map(() => AuthActions.LogoutSuccess()),
  //     catchError((error: any) => of(AuthActions.LogoutFailure({ error })))
  //   ))
  // ));

  // register$ = createEffect(() => this.actions$.pipe(
  //   ofType(AuthActions.RegistrationRequested),
  //   switchMap((action) => this.authenticationService.mockRegister$(action.email).pipe(
  //     map(() => AuthActions.RegistrationSuccess()),
  //     catchError((error: any) => of(AuthActions.RegistrationFailure({ error })))
  //   ))
  // ));

  // resetPassword$ = createEffect(() => this.actions$.pipe(
  //   ofType(AuthActions.ResetPasswordRequested),
  //   switchMap((action) => this.authenticationService.mockResetPassword$(action.email).pipe(
  //     map(() => AuthActions.ResetPasswordSuccess()),
  //     catchError((error: any) => of(AuthActions.ResetPasswordFailure({ error })))
  //   ))
  // ));
}
