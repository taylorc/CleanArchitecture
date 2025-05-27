import useBootstrapClient from "./plugins/useBootstrap.client";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: [],
  css: ['~/assets/css/main.scss'],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  $development: {
    routeRules: {
      '/api/**': {
        proxy: `${process.env.ApiUrl}/api/**`,
      }
    },
    devServer: {
      https: {
        key: import.meta.env.CERT_KEY_PATH ?? 'dev-cert.key',
        cert: import.meta.env.CERT_PATH ?? 'dev-cert.pem'
      }
    }
  },
  runtimeConfig: {
    public: {
      otelExporterOtlpEndpoint: '',
      otelExporterOtlpHeaders: '',
      otelResourceAttributes: '',
      otelServiceName: '',
      apiUrl: process.env.ApiUrl,
    }
  }
})
