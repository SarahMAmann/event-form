import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { BandsComponent, BandListComponent } from '../views'
import { FormExampleComponent } from '../views/form-example/form-example.component';
import { AuthenticationGuard } from '@app/shared/guards/authentication-guard';

const routes: Routes = [
  {
    path: '',
    component: BandsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BandListComponent
      },
      {
        path: 'form',
        component: FormExampleComponent
      }
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BandsRoutingModule { }
