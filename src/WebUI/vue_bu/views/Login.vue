<template>
  <p>{{ pageMessage }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import checkForEmptyObject from "@/services/Helper";

import AuthService, {
  AuthenticationResultStatus
} from "@/services/AuthService";
import {
  LoginActions,
  ApplicationPaths,
  QueryParameterNames
} from "@/services/Auth.Constants";
import { INavigationState } from "@/models/Auth";

export default defineComponent({
  name: "Login",
  setup() {
    const pageMessage = ref("");
    const router = useRouter();
    const route = useRoute();
    const authorizeService = new AuthService();

    const action = route.path.split("/")[1];

    async function navigateToReturnUrl(returnUrl: string) {
      // It's important that we do a replace here so that we remove the callback uri with the
      // fragment containing the tokens from the browser history.
      await router.push(returnUrl);
    }

    async function login(returnUrl: string): Promise<void> {
      const state: INavigationState = { returnUrl };
      const result = await authorizeService.signIn(state);
      pageMessage.value = "";
      switch (result.status) {
        case AuthenticationResultStatus.Redirect:
          break;
        case AuthenticationResultStatus.Success:
          await navigateToReturnUrl(returnUrl);
          break;
        case AuthenticationResultStatus.Fail:
          router.push({
            path: ApplicationPaths.LoginFailedPathComponents[0],
            query: { [QueryParameterNames.Message]: result.message }
          });
          // await router.push(ApplicationPaths.LoginFailedPathComponents, {
          //   params: { [QueryParameterNames.Message]: result.message }
          // });
          break;
        default:
          throw new Error(`Invalid status result ${(result as any).status}.`);
      }
    }

    function getStringFromArray(value: string | string[]): string {
      if (Array.isArray(value)) {
        return value[0];
      }

      return value;
    }

    function getReturnUrl(state?: INavigationState): string {
      console.log(checkForEmptyObject(route.query));
      const fromQuery: string = getStringFromArray(route.query.returnUrl);
      // If the url is comming from the query string, check that is either
      // a relative url or an absolute url
      // if (
      //   fromQuery &&
      //   !(
      //     fromQuery.startsWith(`${window.location.origin}/`) ||
      //     /\/[^/].*/.test(fromQuery)
      //   )
      // ) {
      //   // This is an extra check to prevent open redirects.
      //   throw new Error(
      //     "Invalid return url. The return url needs to have the same origin as the current page."
      //   );
      // }
      return (
        (state && state.returnUrl) ||
        fromQuery.toString() ||
        ApplicationPaths.DefaultLoginRedirectPath
      );
    }

    async function processLoginCallback(): Promise<void> {
      const url = window.location.href;
      const result = await authorizeService.completeSignIn(url);
      switch (result.status) {
        case AuthenticationResultStatus.Redirect:
          // There should not be any redirects as completeSignIn never redirects.
          throw new Error("Should not redirect.");
        case AuthenticationResultStatus.Success:
          await navigateToReturnUrl(getReturnUrl(result.state));
          break;
        case AuthenticationResultStatus.Fail:
          pageMessage.value = result.message;
          break;
      }
    }

    function redirectToApiAuthorizationPath(apiAuthorizationPath: string) {
      // It's important that we do a replace here so that when the user hits the back arrow on the
      // browser they get sent back to where it was on the app instead of to an endpoint on this
      // component.
      const redirectUrl = `${window.location.origin}${apiAuthorizationPath}`;
      window.location.replace(redirectUrl);
    }

    function redirectToRegister(): void {
      redirectToApiAuthorizationPath(
        `${ApplicationPaths.IdentityRegisterPath}?returnUrl=${encodeURI(
          "/" + ApplicationPaths.Login
        )}`
      );
    }

    function redirectToProfile(): void {
      redirectToApiAuthorizationPath(ApplicationPaths.IdentityManagePath);
    }

    async function init() {
      switch (action) {
        case LoginActions.Login:
          await login(getReturnUrl());
          break;
        case LoginActions.LoginCallback:
          await processLoginCallback();
          break;
        case LoginActions.LoginFailed:
          pageMessage.value = getStringFromArray(route.query.message);
          break;
        case LoginActions.Profile:
          redirectToProfile();
          break;
        case LoginActions.Register:
          redirectToRegister();
          break;
        default:
          throw new Error(`Invalid action '${action}'`);
      }
    }

    init();

    return { pageMessage };
  }
});
</script>
