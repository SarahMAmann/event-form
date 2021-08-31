import * as fromAuth from './auth/auth.reducer';
import { RouterReducerState } from '@ngrx/router-store';

export interface AppState {
  auth: fromAuth.State;
  router: RouterReducerState;
}
