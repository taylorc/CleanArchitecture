<script setup lang="ts">
    import { ref } from "vue";

    const count = ref(0)

</script>
<template>
    <div>
        <h1>Counter</h1>

        <p>This is a simple example of a Nuxt component.</p>

        <p aria-live="polite">Current count: <strong>{{count}}</strong></p>

        <button className="btn btn-primary" @click="count++">Increment</button>
      </div>
</template>