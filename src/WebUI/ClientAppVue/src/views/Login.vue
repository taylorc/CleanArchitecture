<template>
  <div class="home">
    <p v-if="isLoggedIn">User: {{ username }}</p>
    <button @click="login" v-if="!isLoggedIn">Login</button>
    <button @click="logout" v-if="isLoggedIn">Logout</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import AuthService from "@/services/AuthService";

export default defineComponent({
  async setup() {
    let auth: AuthService = null;
    let currentUser = "";
    let accessTokenExpired: boolean | undefined = false;
    const isLoggedIn = ref(false);

    const username = computed(() => currentUser);

    const login = () => {
      auth.login();
    };

    const logout = () => {
      auth.logout();
    };

    const init = async () => {
      auth = new AuthService();
      // eslint-disable-next-line prettier/prettier
      const user = await auth.getUser(); //.then((user) => {
      if (user !== null) {
        currentUser = user.profile.name;
        accessTokenExpired = user.expired;
        isLoggedIn.value = !accessTokenExpired;
      } else {
        isLoggedIn.value = false;
      }

      console.log(isLoggedIn.value);
    };

    await init();

    return { username, login, logout, currentUser, isLoggedIn };
  }
});
</script>
