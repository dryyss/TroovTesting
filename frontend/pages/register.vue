<template>
  <div
    class="min-h-screen bg-[#E5F6FF] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Inscription</h2>
        <p class="mt-2 text-sm text-gray-600">
          Ou
          <nuxt-link
            to="/login"
            class="font-medium text-emerald-500 hover:text-emerald-600"
            class="font-medium text-primary-500 hover:text-primary-600"
          >
            connectez-vous à votre compte
          </nuxt-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label
              for="firstName"
              class="block text-sm font-medium text-gray-700"
              >Prénom</label
            >
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              required
              :class="[
                'input-field mt-1',
                { 'border-red-500': errors.firstName },
              ]"
              placeholder="Votre prénom"
              @input="clearError('firstName')"
            />
            <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
              {{ errors.firstName }}
            </p>
          </div>

          <div>
            <label
              for="lastName"
              class="block text-sm font-medium text-gray-700"
              >Nom</label
            >
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              required
              :class="[
                'input-field mt-1',
                { 'border-red-500': errors.lastName },
              ]"
              placeholder="Votre nom"
              @input="clearError('lastName')"
            />
            <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">
              {{ errors.lastName }}
            </p>
          </div>

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
              placeholder="votre@email.com"
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
              placeholder="••••••••"
              @input="clearError('password')"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>

          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700"
            >
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              :class="[
                'input-field mt-1',
                { 'border-red-500': errors.confirmPassword },
              ]"
              placeholder="••••••••"
              @input="clearError('confirmPassword')"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
              {{ errors.confirmPassword }}
            </p>
          </div>
        </div>

        <!-- Message d'erreur général -->
        <div v-if="generalError" class="rounded-md bg-red-50 p-4">
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
              <p class="text-sm text-red-700">{{ generalError }}</p>
            </div>
          </div>
        </div>

        <!-- Bouton d'inscription -->
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
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
            {{ loading ? 'Création du compte...' : 'Créer un compte' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  middleware: 'guest',
  data() {
    return {
      loading: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      generalError: '',
    }
  },
  methods: {
    clearError(field) {
      this.errors[field] = ''
      this.generalError = ''
    },
    validateForm() {
      let isValid = true
      this.errors = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
      this.generalError = ''

      if (!this.form.firstName.trim()) {
        this.errors.firstName = 'Le prénom est requis'
        isValid = false
      }

      if (!this.form.lastName.trim()) {
        this.errors.lastName = 'Le nom est requis'
        isValid = false
      }

      if (!this.form.email.trim()) {
        this.errors.email = "L'email est requis"
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = "L'email n'est pas valide"
        isValid = false
      }

      if (!this.form.password) {
        this.errors.password = 'Le mot de passe est requis'
        isValid = false
      } else if (this.form.password.length < 6) {
        this.errors.password =
          'Le mot de passe doit contenir au moins 6 caractères'
        isValid = false
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Les mots de passe ne correspondent pas'
        isValid = false
      }

      return isValid
    },
    async handleRegister() {
      try {
        if (!this.validateForm()) {
          return
        }

        this.loading = true
        const registerResponse = await this.$axios.$post('/api/auth/register', {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          password: this.form.password,
        })

        if (registerResponse.success) {
          await this.$auth.loginWith('local', {
            data: {
              email: this.form.email,
              password: this.form.password,
            },
          })

          this.$router.push('/dashboard')
        }
      } catch (error) {
        console.error('Erreur:', error)
        if (error.response?.data?.details) {
          // Gestion des erreurs de validation spécifiques
          const details = error.response.data.details
          Object.keys(details).forEach((field) => {
            if (this.errors.hasOwnProperty(field)) {
              this.errors[field] = details[field]
            }
          })
        } else {
          this.generalError =
            error.response?.data?.message || "Erreur lors de l'inscription"
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
