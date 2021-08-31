import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { User, UserManager } from "oidc-client";
import { environment } from "@env/environment";
import { Router } from "@angular/router";
import { ResetPasswordRequest } from "../interfaces/resetPasswordRequest.interface";

enum ep {
  Login = "/auth/login",
  Logout = "/auth/logout",
  Register = "/auth/register",
  Reset = "/auth/reset",
}

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  private manager = new UserManager({
    authority: environment.tokenAuthority,
    client_id: "wwc.starter.app",
    client_secret: "secret",
    redirect_uri: `${window.location.origin}/auth-callback`,
    post_logout_redirect_uri: window.location.origin,
    scope: "openid api1",
    response_type: "code",
    filterProtocolClaims: true,
    loadUserInfo: true,
  });

  async isLoggedIn(): Promise<boolean> {
    const user = await this.manager.getUser();
    return user != null && !user.expired;
  }

  getUser(): Promise<User> {
    return this.manager.getUser();
  }

  async startAuthentication(returnUrl: string): Promise<void> {
    // this.appState.setSavedUrl(returnUrl);
    // let extraQueryParams = {};
    // return this.manager.signinRedirect({ extraQueryParams });

    return this.manager.signinRedirect({ state: returnUrl });
  }

  async completeAuthentication(): Promise<User> {
    let user: User;

    try {
      user = await this.manager.signinRedirectCallback();
    } catch (error) {
      // this.appState.removeSavedUrl();

      // TODO:  What should happen on login error / cancel
      if (error) {
        // this.logger.error(error);
      }
      return null;
    }
    this.redirectToSavedUrl();

    return user;
  }

  redirectToSavedUrl() {
    // const returnUrl = this.appState.getSavedUrl();
    // this.appState.removeSavedUrl();
    // if (returnUrl) {
    //   this.logger.debug("Redirecting on successful login", returnUrl);
    //   this.router.navigate([returnUrl]);
    // }
    this.router.navigate(["/bands"]);
  }

  resetPasswordRequest(email: string){
    const resetPasswordRequest: ResetPasswordRequest = {
      email
    }
    return this.http.post(environment.tokenAuthority + "/password/resetPasswordRequest", resetPasswordRequest);
  }

  logOut() {
    return this.manager.signoutRedirect();
  }

  register() {
    return this.manager.createSigninRequest()
      .then(data => {
        const params = new HttpParams()
          .set('client_id', data.state.client_id)
          .set('redirect_uri', encodeURI(this.manager.settings.redirect_uri))
          .set('response_type', 'code')
          .set('scope', data.state.scope)
          .set('state', data.state.id)
          .set('code_challenge', data.state.code_challenge)
          .set('code_challenge_method', 'S256')
          .set('response_mode', data.state.response_mode)
          .toString();
          const paramsString = encodeURIComponent(params).toString();
          this.navigateToRegister(paramsString);
      })
  }

  navigateToRegister(paramsString) {
    const baseURL = encodeURIComponent("/connect/authorize/callback?").toString();
    const finalUrl = baseURL + paramsString;
    window.open(environment.tokenAuthority + '/account/register?returnUrl=' + finalUrl);

  }
}
