import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss'],
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService
      .completeAuthentication()
      .then((result) => {
        // TODO: Determine UX for failed logins
        if (!result) {
          console.warn('Login failed.  Redirecting back to home');
          this.router.navigateByUrl('/');
        }
      })
      .catch((reason) => {
        // TODO: What is the UX for generic errors?
        console.warn(
          'Error retrieving login result. Redirecting back to home'
        );
        this.router.navigateByUrl('/');
      });
  }
}