import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toasterService: ToastService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
        //   this.router.navigate(['/account/login']);
        console.log('403')
        }
        this.toasterService.showErrorToast(err.statusText);
        // const error = err.error.message || err.statusText;
        console.log(err);
        console.log(err.statusText);
        return throwError(err);
      })
    );
  }
}
