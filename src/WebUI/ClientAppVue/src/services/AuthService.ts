/* eslint-disable @typescript-eslint/camelcase */
// https://damienbod.com/2019/01/29/securing-a-vue-js-app-using-openid-connect-code-flow-with-pkce-and-identityserver4/

import { ApplicationName, ApplicationPaths } from "@/models/Auth";
import { UserManager, User } from "oidc-client";

export default class AuthService {
  private userManager: UserManager;

  //TODO set user manager to a global state object so multiple calls don't happen
  constructor() {
    if (this.userManager !== undefined) {
      return;
    }

    let response: Response;

    fetch(ApplicationPaths.ApiAuthorizationClientConfigurationUrl).then(
      r => (response = r)
    );
    if (!response.ok) {
      throw new Error(`Could not load settings for '${ApplicationName}'`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const settings: any = response.json();
    settings.automaticSilentRenew = true;
    settings.includeIdTokenInSilentRenew = true;
    this.userManager = new UserManager(settings);

    this.userManager.events.addUserSignedOut(async () => {
      await this.userManager.removeUser();
    });
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
