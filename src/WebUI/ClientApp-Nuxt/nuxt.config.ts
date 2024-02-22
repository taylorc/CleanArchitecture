// @ts-ignore
export default defineNuxtConfig({
    css: ['~/assets/styles/main.scss'],
    devServer: {
        port: process.env.PORT || 44447,
        https: {
          key: process.env.SSL_KEY_FILE,
          cert: process.env.SSL_CRT_FILE
        }
      }
})