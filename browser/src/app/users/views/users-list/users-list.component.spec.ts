import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersService } from '../../services/users.service';
import { UsersListComponent } from './users-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

let userServiceStub: Partial<any>;
let userService;

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let store: MockStore;
  const initialState = { users: [{something: 'something'}], loggedIn: false };

  beforeEach(async(() => {
    userServiceStub = {
        isLoggedIn: true,
        user: { name: 'Test User' }
      };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forRoot({})
      ],
      declarations: [ UsersListComponent ],
      providers: [
        Store,
        provideMockStore({ initialState }),
        { provide: UsersService, useValue: userServiceStub },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  }));

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

});