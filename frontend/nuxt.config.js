export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Troov - Gestion d'objets",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: "Application de gestion d'objets",
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css', 'vue-toastification/dist/index.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/toast.js', mode: 'client' },
    { src: '~/plugins/auth.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build: https://go.nuxtjs.dev/config-modules
  buildModules: [
    // '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3001',
    credentials: true,
    withCredentials: true,
    debug: process.env.NODE_ENV !== 'production',
    proxy: false,
    retry: { retries: 3 },
  },

  // Auth module configuration
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/dashboard',
    },
    strategies: {
      local: {
        scheme: 'local',
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url: '/api/auth/logout',
            method: 'post',
          },
          user: {
            url: '/api/auth/user',
            method: 'get',
            propertyName: 'user',
          },
        },
        token: {
          property: 'token',
          required: true,
          type: 'Bearer',
          maxAge: 604800,
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
      },
    },
    cookie: {
      options: {
        secure: process.env.NODE_ENV === 'production',
      },
    },
    plugins: ['~/plugins/auth.js'],
  },

  // Server configuration
  server: {
    port: 3000,
    host: 'localhost',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
}
