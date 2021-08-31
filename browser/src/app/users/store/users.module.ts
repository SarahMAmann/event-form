import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromUsers from './users.reducer';
import { UsersEffects } from './users.effects';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromUsers.usersFeatureKey, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects])
  ]
})
export class UsersStoreModule { }
