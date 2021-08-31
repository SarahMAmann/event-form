import { NgModule } from '@angular/core';
import { HomeComponent, PublicComponent } from './views';
import { LayoutModule } from '@app/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PublicRoutingModule } from './routing/public.routing';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    LayoutModule,
    NgbModule,
    PublicRoutingModule,
    FormsModule
   ],
  exports: [],
  declarations: [
    PublicComponent,
    HomeComponent,
    ForgotPasswordComponent
   ],
  providers: []
})
export class PublicModule {}
