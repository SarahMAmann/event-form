import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthCallbackComponent } from './auth-callback.component';
import { AuthenticationService } from '@app/core/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthCallbackComponent', () => {
  let component: AuthCallbackComponent;
  let fixture: ComponentFixture<AuthCallbackComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCallbackComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]),],
      providers: [AuthenticationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
