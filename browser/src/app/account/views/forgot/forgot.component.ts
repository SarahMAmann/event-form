import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core/store/app.state';
import * as AuthActions from '@app/core/store/auth/auth.actions';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  form: FormGroup;

  ngOnInit() {
    this.initializeFormGroup();
  }

  private initializeFormGroup() {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required])
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { email } = this.form.value;

      this.store.dispatch(AuthActions.ResetPasswordRequested({ email }));
    }
  }
}
