<template>
  <header>
    <nav
      class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3"
    >
      <div class="container">
        <router-link class="navbar-brand" to="/"
          >CleanArchitecture.WebUI.Vue</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target=".navbar-collapse"
          aria-label="Toggle navigation"
          :aria-expanded="isExpanded"
          @click="toggle()"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse"
          :style="{
            show: isExpanded
          }"
        >
          <!-- <app-login-menu></app-login-menu> -->
          <ul class="navbar-nav flex-grow">
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/"
                >Counter</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/fetchdata"
                >Fetch data</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-dark" to="/">To-Do</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link text-dark" href="/api" target="_blank">API</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
  setup() {
    let isExpanded = false;

    function collapse() {
      isExpanded = false;
    }
    function toggle() {
      isExpanded = !isExpanded;
    }

    return { collapse, isExpanded, toggle };
  }
});
</script>
<style lang="scss" scoped>
a.navbar-brand {
  white-space: normal;
  text-align: center;
  word-break: break-all;
}

html {
  font-size: 14px;
}
@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

.box-shadow {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
}
</style>
