import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services';

@Component({
  selector: 'app-header',
  styleUrls: [
    'header.component.scss'
  ],
  templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthenticationService) { }

  navbarOpen = false;

  ngOnInit() { }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  authenticate() {
    // Replace placeholder with post login return url, after creating method to persist said url

    this.authService.startAuthentication('placeholder');
  }

  register() {
    this.authService.register();
  }

  logOut() {
    this.authService.logOut();
  }
}
