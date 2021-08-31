import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCallbackComponent } from '@app/auth/auth-callback/auth-callback.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../../public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'account',
    loadChildren: () => import('../../account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'bands',
    loadChildren: () => import('../../bands/bands.module').then(m => m.BandsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../../users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
