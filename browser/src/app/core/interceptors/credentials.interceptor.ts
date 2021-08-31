import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AuthenticationService } from '../services';
import { User } from 'oidc-client';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthenticationService
  ){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.auth.getUser())
      .pipe(
        switchMap((result: User) => {
          if(result){
            const token = result.access_token;
            const requestClone = request.clone({
              headers: request.headers
                .set('Authorization', `Bearer ${token}`),
              withCredentials: true
            });
            return next.handle(requestClone);
          }
            return next.handle(request.clone({
              withCredentials: false
            }));
        })
      )
  }
}
