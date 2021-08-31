import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services';
import { AppRoutingModule } from './routing/app.routing';
import { AppStoreModule } from './store/app.store';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from './services/toast.service';
import { CredentialsInterceptor } from './interceptors/credentials.interceptor';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppStoreModule
  ],
  providers: [
    AuthenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // ToastrModule
    ToastService
  ],
  exports: [
    AppRoutingModule,
    AppStoreModule
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    core: CoreModule
  ) {
    if (core) {
      throw new Error('CoreModule already instantiated!');
    }
  }
}
