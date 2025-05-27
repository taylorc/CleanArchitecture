
<script setup lang="ts">
const isExpanded = ref(false);

function toggle() {
  isExpanded.value = !isExpanded.value;
}

</script>

<template>
  <header>
  <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
    <div class="container">
      <a class="navbar-brand" to="/">CleanArchitecture.Web</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target=".navbar-collapse"
        aria-label="Toggle navigation"
        aria-expanded="true" 
        :click="toggle"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse d-sm-inline-flex justify-content-end" :class="{ show: isExpanded }">
        <ul class="navbar-nav flex-grow">
          <li class="nav-item" >
            <NuxtLink class="nav-link text-dark" to="/" activeClass="link-active">Home</NuxtLink>
          </li>
          <li class="nav-item" >
            <NuxtLink class="nav-link text-dark" to="/counter" activeClass="link-active">Counter</NuxtLink>
          </li>
          <li class="nav-item" >
            <NuxtLink class="nav-link text-dark" to="/fetch-data" activeClass="link-active">Fetch data</NuxtLink>
          </li>
          <li class="nav-item" >
            <NuxtLink class="nav-link text-dark" to="/todo" activeClass="link-active">Todo</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-dark" to="/api" target="_blank" external>API</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link text-dark" to="/Identity/Account/Manage" external>Account</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
</template>

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
    box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
  }
</style>

