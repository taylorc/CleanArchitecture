<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <NavBar />
  <div class="container">
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar
  }
});
</script>
<style lang="scss">
/* You can add global styles to this file, and also import other style files */

/* Provide sufficient contrast against white background */
a {
  color: #0366d6;
}

code {
  color: #e01a76;
}

.btn-primary {
  color: #fff;
  background-color: #1b6ec2;
  border-color: #1861ac;
}
</style>
