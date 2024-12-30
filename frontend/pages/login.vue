<template>
  <div
    class="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Connexion</h2>
        <p class="mt-2 text-sm text-gray-600">
          Ou
          <nuxt-link
            to="/register"
            class="font-medium text-emerald-500 hover:text-emerald-600"
          >
            créez un nouveau compte
          </nuxt-link>
        </p>
      </div>

      <form class="space-y-6" @submit.prevent="handleLogin">
        <!-- Message d'erreur -->
        <div
          v-if="error"
          class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md"
        >
          {{ error }}
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div class="mt-1">
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              :class="{ 'border-red-300': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>
        </div>

        <!-- Mot de passe -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <div class="mt-1">
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              :class="{ 'border-red-300': errors.password }"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>
        </div>

        <!-- Se souvenir de moi -->
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              v-model="form.rememberMe"
              type="checkbox"
              class="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label for="remember_me" class="ml-2 block text-sm text-gray-900">
              Se souvenir de moi
            </label>
          </div>
        </div>

        <!-- Bouton de connexion -->
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  auth: 'guest',
  data() {
    return {
      form: {
        email: '',
        password: '',
        rememberMe: false,
      },
      loading: false,
      error: null,
      errors: {},
    }
  },
  methods: {
    async handleLogin() {
      try {
        this.loading = true
        this.error = null
        this.errors = {}

        // Validation basique
        if (!this.form.email) {
          this.errors.email = "L'email est requis"
          this.loading = false
          return
        }
        if (!this.form.password) {
          this.errors.password = 'Le mot de passe est requis'
          this.loading = false
          return
        }

        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })

        this.$toast.success('Connexion réussie')
        await this.$router.push('/dashboard')
      } catch (error) {
        console.error('Erreur de connexion:', error)
        this.error =
          error.response?.data?.message || 'Email ou mot de passe incorrect'
        this.$toast.error(this.error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
