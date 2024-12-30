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

      <!-- Message d'erreur général -->
      <div v-if="error" class="rounded-md bg-red-50 p-4 mb-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              :class="['input-field mt-1', { 'border-red-500': errors.email }]"
              placeholder="Email"
              @input="clearError('email')"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Mot de passe</label
            >
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              :class="[
                'input-field mt-1',
                { 'border-red-500': errors.password },
              ]"
              placeholder="Mot de passe"
              @input="clearError('password')"
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
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
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
            {{ loading ? 'Connexion...' : 'Se connecter' }}
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
      errors: {
        email: '',
        password: '',
      },
      loading: false,
      error: null,
      errors: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    clearError(field) {
      if (field) {
        this.errors[field] = ''
      }
      this.error = null
    },
    validateForm() {
      let isValid = true
      this.errors = {
        email: '',
        password: '',
      }

      if (!this.form.email) {
        this.errors.email = "L'email est requis"
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = "L'email n'est pas valide"
        isValid = false
      }

      if (!this.form.password) {
        this.errors.password = 'Le mot de passe est requis'
        isValid = false
      }

      return isValid
    },
    async handleLogin() {
      try {
        if (!this.validateForm()) {
          return
        }

        this.loading = true
        this.error = null

        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })

        // Force le rafraîchissement des données utilisateur
        await this.$auth.fetchUser()

        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Erreur de connexion:', error)
        this.error =
          error.response?.data?.message || 'Email ou mot de passe incorrect'

        if (error.response?.data?.errors) {
          this.errors = {
            ...this.errors,
            ...error.response.data.errors,
          }
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
