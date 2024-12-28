<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 bg-white rounded-xl shadow-2xl p-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connexion
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <nuxt-link
            to="/register"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            créez un nouveau compte
          </nuxt-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input-field"
              placeholder="Email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input-field"
              placeholder="Mot de passe"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Se souvenir de moi
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Se connecter
          </button>
        </div>

        <div class="flex items-center justify-center space-x-4">
          <button
            type="button"
            class="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-400"
          >
            <img
              src="~/assets/images/google.svg"
              alt="Google"
              class="w-6 h-6"
            />
          </button>
          <button
            type="button"
            class="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-400"
          >
            <img src="~/assets/images/apple.svg" alt="Apple" class="w-6 h-6" />
          </button>
          <button
            type="button"
            class="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-400"
          >
            <img
              src="~/assets/images/facebook.svg"
              alt="Facebook"
              class="w-6 h-6"
            />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async handleLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: this.form,
        })
        this.$router.push('/dashboard')
      } catch (error) {
        // Gérer l'erreur
      }
    },
  },
}
</script>
