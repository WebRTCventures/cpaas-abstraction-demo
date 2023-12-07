export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cpaas-abstraction-demo',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/CallServicePlugin.ts', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['amazon-chime-sdk-js', '@smithy', '@aws-sdk', 'axios']
  },

  publicRuntimeConfig: {
    apiKey: process.env.API_KEY,
    sessionId: process.env.SESSION_ID,
    token: process.env.TOKEN
  },

  axios: {
    proxy: true
  },
  proxy: {
    '/chime-integration/meeting-session': { 
      target: 'http://127.0.0.1:3001'  
    }
  },

}
