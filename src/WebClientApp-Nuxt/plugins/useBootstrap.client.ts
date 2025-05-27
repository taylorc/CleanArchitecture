import bootstrap from 'bootstrap';
export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      bootstrap: bootstrap
    }
  }
})

// https://jovialcore.medium.com/using-bootstrap-5-with-nuxt-3-6eed2144d1b7