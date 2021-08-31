import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services';
import { ISResponse } from '@app/shared/interfaces/ISResponse.interface';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ) { }

  email: string;

  ngOnInit() {
  }

  resetPassword(){
    this.authenticationService.resetPasswordRequest(this.email)
      .subscribe((response: ISResponse) => {
        if(response.success) {
          this.toastService.showSuccessToast("An email has been sent")
        }
        if(response.error){
          this.toastService.showErrorToast(response.message);
        }
      })
  }

}
