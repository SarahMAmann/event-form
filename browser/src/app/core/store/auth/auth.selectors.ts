import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (authState: fromAuth.State): boolean => authState.isAuthenticated
);