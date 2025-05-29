<script lang="ts" setup>
import { ref } from 'vue';

const currentCount = ref(0);

function incrementCounter() {
  currentCount.value++;
}
</script>
<template>
    <div>
        <h1>Counter</h1>

        <p>This is a simple example of a Nuxt component.</p>

        <p aria-live="polite">Current count: <strong>{{currentCount}}</strong></p>

        <button class="btn btn-primary" @click="incrementCounter">Increment</button>
      </div>
</template>