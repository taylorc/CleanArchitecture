<template>
  <div class="home">
    <p v-if="isLoggedIn">User: {{ username }}</p>
    <button @click="login" v-if="!isLoggedIn">Login</button>
    <button @click="logout" v-if="isLoggedIn">Logout</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import AuthService from "@/services/AuthService";

export default defineComponent({
  setup() {
    const auth = new AuthService();
    let currentUser = "";
    let accessTokenExpired: boolean | undefined = false;
    let isLoggedIn = false;

    const username = computed(() => currentUser);

    const login = () => {
      auth.login();
    };

    const logout = () => {
      auth.logout();
    };

    onMounted(() => {
      // eslint-disable-next-line prettier/prettier
      auth.getUser().then((user) => {
        if (user !== null) {
          currentUser = user.profile.name;
          accessTokenExpired = user.expired;
        }

        isLoggedIn = user && !accessTokenExpired;
      });
    });

    return { username, login, logout, currentUser, isLoggedIn };
  }
});
</script>
