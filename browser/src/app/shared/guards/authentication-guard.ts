import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private authService: AuthenticationService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        // tslint:disable-next-line: no-console
        console.debug('Accessing protected route', state.url);

        return new Promise((resolve) => {
            this.authService.isLoggedIn().then((result: boolean) => {
                if (result) {
                    // tslint:disable-next-line: no-console
                    console.debug('User logged in and can access route');
                    resolve(true);
                } else {
                    // tslint:disable-next-line: no-console
                    console.debug('User not logged in.  Starting auth flow.');
                    this.authService.startAuthentication(state.url);
                    resolve(false);
                }
            });
        });
    }
}
