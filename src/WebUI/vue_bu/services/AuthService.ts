// https://damienbod.com/2019/01/29/securing-a-vue-js-app-using-openid-connect-code-flow-with-pkce-and-identityserver4/

import { UserManager, User, Profile } from 'oidc-client';
import { ref } from 'vue';
import { ApplicationName, ApplicationPaths } from './Auth.Constants';

export type AuthenticationResult =
  SuccessAuthenticationResult |
  FailureAuthenticationResult |
  RedirectAuthenticationResult;

export interface SuccessAuthenticationResult {
  status: AuthenticationResultStatus.Success;
  state: any;
}

export interface FailureAuthenticationResult {
  status: AuthenticationResultStatus.Fail;
  message: string;
}

export interface RedirectAuthenticationResult {
  status: AuthenticationResultStatus.Redirect;
}

export enum AuthenticationResultStatus {
  Success,
  Redirect,
  Fail
}

export interface IUser {
  name: string;
}

const userState = ref<Profile | null>(null);

export default class AuthService {
  private popUpDisabled = true;
    private settings: any = {};
    private userManager: UserManager = new UserManager(this.settings);

    constructor() {
      //TODO change to a hook
      this.ensureUserManagerInitialized();
    }

    public isAuthenticated(): boolean {
    let user: User | null = null;
    this.getUser().then(u=>user=u);
    return !!user;
  }

    private createArguments(state?: any): any {
    return { useReplaceToNavigate: true, data: state };
  }

    private error(message: string): AuthenticationResult {
    return { status: AuthenticationResultStatus.Fail, message };
  }

  private success(state: any): AuthenticationResult {
    return { status: AuthenticationResultStatus.Success, state };
  }

  public async completeSignIn(url: string): Promise<AuthenticationResult> {
    try {
      await this.ensureUserManagerInitialized();
      const user = await this.userManager.signinCallback(url);
      userState.value = user.profile;
      return this.success(user && user.state);
    } catch (error) {
      console.log('There was an error signing in: ', error);
      return this.error('There was an error signing in.');
    }
  }

  private redirect(): AuthenticationResult {
    return { status: AuthenticationResultStatus.Redirect };
  }

    public async getUser(): Promise<User | null> {

      return await this.getUserFromStorage();
    }

    public async signIn(state: any): Promise<AuthenticationResult> {
    await this.ensureUserManagerInitialized();
    let user: User | null = null;
    try {
      user = await this.userManager.signinSilent(this.createArguments());
      userState.value = user.profile;
      return this.success(state);
    } catch (silentError) {
      // User might not be authenticated, fallback to popup authentication
      console.log('Silent authentication error: ', silentError);

      try {
        if (this.popUpDisabled) {
          throw new Error('Popup disabled. Change \'authorize.service.ts:AuthorizeService.popupDisabled\' to false to enable it.');
        }
        user = await this.userManager.signinPopup(this.createArguments());
        userState.value = user.profile;
        return this.success(state);
      } catch (popupError) {
        if (popupError.message === 'Popup window closed') {
          // The user explicitly cancelled the login action by closing an opened popup.
          return this.error('The user closed the window.');
        } else if (!this.popUpDisabled) {
          console.log('Popup authentication error: ', popupError);
        }

        // PopUps might be blocked by the user, fallback to redirect
        try {
          await this.userManager.signinRedirect(this.createArguments(state));
          return this.redirect();
        } catch (redirectError) {
          console.log('Redirect authentication error: ', redirectError);
          return this.error(redirectError);
        }
      }
    }
  }


    private async getUserFromStorage(): Promise<User | null> {
      const u: User | null  = await this.userManager.getUser();
      return u && u;

  }

    public login(): Promise<void> {
        return this.userManager.signinRedirect();
    }

    public logout(): Promise<void> {
        return this.userManager.signoutRedirect();
    }

    public getAccessToken(): Promise<string> {
        return this.userManager.getUser().then((data: any) => {
            return data.access_token;
        });
            }

    private async ensureUserManagerInitialized(): Promise<void> {
      if (this.userManager !== undefined) {
        return;
      }

      const response = await fetch(ApplicationPaths.ApiAuthorizationClientConfigurationUrl);
      if (!response.ok) {
        throw new Error(`Could not load settings for '${ApplicationName}'`);
      }

      this.settings = await response.json();
      this.settings.automaticSilentRenew = true;
      this.settings.includeIdTokenInSilentRenew = true;
      this.userManager = new UserManager(this.settings);

      this.userManager.events.addUserSignedOut(async () => {
        await this.userManager.removeUser();
      });
    }
}
