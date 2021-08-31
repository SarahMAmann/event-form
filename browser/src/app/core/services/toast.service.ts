import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
    constructor(public toast: ToastrService) {}

  showErrorToast(errorMessage) {
    this.toast.error(errorMessage, 'Error', { positionClass: 'toast-top-center' });
  }

  showSuccessToast(successMessage) {
    this.toast.success(successMessage, 'Success', { positionClass: 'toast-top-center' });
  }

  showInfoToast(infoMessage) {
    this.toast.info(infoMessage, 'info', { positionClass: 'toast-top-center' });
  }

  showWarningToast(warningMessage) {
    this.toast.warning(warningMessage, 'Warning', { positionClass: 'toast-top-center' });
  }

}
