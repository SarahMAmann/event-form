import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    AuthModule,
    StoreModule.forRoot({},
      {
        metaReducers: !environment.production ? [storeFreeze] : []
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [],
  declarations: [],
  providers: []
})
export class AppStoreModule { }
