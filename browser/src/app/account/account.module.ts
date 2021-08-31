import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent, LoginComponent, ForgotComponent, RegisterComponent } from './views';
import { AccountRoutingModule } from './routing/account.routing';
import { LayoutModule } from '@app/layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    ForgotComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    LayoutModule
  ]
})
export class AccountModule { }
