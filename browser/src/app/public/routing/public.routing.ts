import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, PublicComponent } from '../views';
import { ForgotPasswordComponent } from '../views/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      },
      {
        path: 'reset',
        pathMatch: 'full',
        component: ForgotPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class PublicRoutingModule {}
