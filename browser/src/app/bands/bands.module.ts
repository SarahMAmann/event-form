import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandsRoutingModule } from './routing/bands.routing';
import { BandsComponent, BandListComponent } from './views';
import { LayoutModule } from '@app/layout/layout.module';
import { FormExampleComponent } from './views/form-example/form-example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared/shared.module';
import { BandsService } from './services/bands.service';

@NgModule({
  declarations: [
    BandsComponent,
    BandListComponent,
    FormExampleComponent
  ],
  imports: [
    CommonModule,
    BandsRoutingModule,
    CommonModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  providers: [
    BandsService
  ]
})
export class BandsModule { }
