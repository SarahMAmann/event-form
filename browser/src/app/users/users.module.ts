import { NgModule } from '@angular/core';
import { UsersComponent, UsersListComponent } from './views';
import { LayoutModule } from '@app/layout/layout.module';
import { UsersRoutingModule } from './routing/users.routing';
import { CommonModule } from '@angular/common';
import { UsersService } from './services/users.service';
import { UsersStoreModule } from './store/users.module';
import { UsersListTableComponent } from './components/users-list-table/users-list-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    UsersRoutingModule,
    LayoutModule,
    UsersStoreModule
  ],
  entryComponents: [ModalComponent],
  exports: [],
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersListTableComponent,
    ModalComponent
  ],
  providers: [UsersService]
})
export class UsersModule { }
