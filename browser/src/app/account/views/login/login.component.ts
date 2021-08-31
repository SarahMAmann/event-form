import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/store/app.state';
import * as AuthActions from '@app/core/store/auth/auth.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  form: FormGroup;

  ngOnInit() {
    this.initializeFormGroup();
  }

  private initializeFormGroup() {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', [Validators.required])
    });
  }

  onSubmit() {
    this.store.dispatch(AuthActions.LoginRequested({ authCredentials: this.form.value }));
  }
}
