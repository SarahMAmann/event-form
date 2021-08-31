import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../models/user.model';
import * as fromUsers from './users.reducer';

export const selectUsersState = createFeatureSelector<fromUsers.State>(
  fromUsers.usersFeatureKey
);

export const selectUsersList = createSelector(
  selectUsersState,
  (state: fromUsers.State): User[] => state.users
);

export const selectUserById = (id: number) => createSelector(
  selectUsersList,
  (state: User[]): User => state.find(x => x.id === id)
);