import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@app/users/models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  @Input() user: User;
  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<any>();

  form: FormGroup;

  ngOnInit() {
    this.initializeFormGroup();
  }

  initializeFormGroup() {
    const { firstName = '', lastName = '', email = '', age = '' } =
      this.user || {};
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control(firstName),
      lastName: this.formBuilder.control(lastName),
      email: this.formBuilder.control(email),
      age: this.formBuilder.control(age)
    });
  }

  onSave() {
    const userToSave = {
      ...this.form.value,
      id: this.user ? this.user.id : null
    };
    this.save.emit(userToSave);
  }

  onCancel() {
    this.cancel.emit();
  }
}
