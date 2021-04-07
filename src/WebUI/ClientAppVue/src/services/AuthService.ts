/* eslint-disable @typescript-eslint/camelcase */
// https://damienbod.com/2019/01/29/securing-a-vue-js-app-using-openid-connect-code-flow-with-pkce-and-identityserver4/

import { ApplicationName, ApplicationPaths } from "@/models/Auth";
import { UserManager, User } from "oidc-client";
import { useRouter } from "vue-router";
import useStore from "@/store";

export default class AuthService {
  private userManager: UserManager;
  router = useRouter();
  store = useStore();
  //TODO: set user manager to a global state object so multiple calls don't happen
  //constructor() {}

  private async ensureUserManagerIsInitialized() {
    if (this.userManager !== undefined) {
      return;
    }
    console.log(ApplicationPaths.ApiAuthorizationClientConfigurationUrl);

    const response = await fetch(
      ApplicationPaths.ApiAuthorizationClientConfigurationUrl
    );

    await this.processResponse(response);
  }

  async signinRedirectCallback() {
    //TODO set user in a global state
    await this.ensureUserManagerIsInitialized();
    console.log("signinRedirectCallback");

    await this.userManager.signinRedirectCallback();
    this.router.push("/");
  }

  public async getUser(): Promise<User | null> {
    await this.ensureUserManagerIsInitialized();
    console.log("getUser....");

    return await this.userManager.getUser();
  }

  public async login(): Promise<void> {
    await this.ensureUserManagerIsInitialized();
    return await this.userManager.signinRedirect();
  }

  public async logout(): Promise<void> {
    await this.ensureUserManagerIsInitialized();
    return await this.userManager.signoutRedirect();
  }

  processResponse = async (response: Response) => {
    if (!response.ok) {
      throw new Error(`Could not load settings for '${ApplicationName}'`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const settings: any = await response.json();

    console.log("processResponse...", settings);

    settings.automaticSilentRenew = true;
    settings.includeIdTokenInSilentRenew = true;

    this.userManager = new UserManager(settings);
    this.userManager.events.addUserSignedOut(async () => {
      await this.userManager.removeUser();
    });
  };
}
