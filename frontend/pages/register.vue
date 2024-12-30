<template>
  <div
    class="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Inscription</h2>
        <p class="mt-2 text-sm text-gray-600">
          Ou
          <nuxt-link
            to="/login"
            class="font-medium text-emerald-500 hover:text-emerald-600"
          >
            connectez-vous à votre compte
          </nuxt-link>
        </p>
      </div>

      <form class="space-y-6" @submit.prevent="handleRegister">
        <!-- Message d'erreur -->
        <div
          v-if="error"
          class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md"
        >
          {{ error }}
        </div>

        <!-- Prénom -->
        <div>
          <label
            for="firstName"
            class="block text-sm font-medium text-gray-700"
          >
            Prénom
          </label>
          <div class="mt-1">
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              :class="{ 'border-red-300': errors.firstName }"
            />
            <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
              {{ errors.firstName }}
            </p>
          </div>
        </div>

        <!-- Nom -->
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <div class="mt-1">
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              :class="{ 'border-red-300': errors.lastName }"
            />
            <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">
              {{ errors.lastName }}
            </p>
          </div>
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

        <!-- Confirmation du mot de passe -->
        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700"
          >
            Confirmer le mot de passe
          </label>
          <div class="mt-1">
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              :class="{ 'border-red-300': errors.confirmPassword }"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
              {{ errors.confirmPassword }}
            </p>
          </div>
        </div>

        <!-- Bouton d'inscription -->
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
            {{ loading ? 'Inscription en cours...' : "S'inscrire" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  auth: 'guest',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      loading: false,
      error: null,
      errors: {},
    }
  },
  methods: {
    validateForm() {
      this.errors = {}

      if (!this.form.firstName) {
        this.errors.firstName = 'Le prénom est requis'
      }

      if (!this.form.lastName) {
        this.errors.lastName = 'Le nom est requis'
      }

      if (!this.form.email) {
        this.errors.email = "L'email est requis"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = "L'email n'est pas valide"
      }

      if (!this.form.password) {
        this.errors.password = 'Le mot de passe est requis'
      } else if (this.form.password.length < 6) {
        this.errors.password =
          'Le mot de passe doit contenir au moins 6 caractères'
      }

      if (!this.form.confirmPassword) {
        this.errors.confirmPassword =
          'La confirmation du mot de passe est requise'
      } else if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Les mots de passe ne correspondent pas'
      }

      return Object.keys(this.errors).length === 0
    },
    async handleRegister() {
      try {
        this.loading = true
        this.error = null

        if (!this.validateForm()) {
          this.loading = false
          return
        }

        await this.$axios.post('/api/auth/register', {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          password: this.form.password,
        })

        // Connexion automatique après l'inscription
        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })

        this.$toast.success('Inscription réussie')
        await this.$router.push('/dashboard')
      } catch (error) {
        console.error("Erreur d'inscription:", error)
        this.error =
          error.response?.data?.message || "Erreur lors de l'inscription"
        this.$toast.error(this.error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
