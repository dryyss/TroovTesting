<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 bg-white rounded-xl shadow-2xl p-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou
          <nuxt-link
            to="/login"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            connectez-vous à votre compte
          </nuxt-link>
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
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
          <div>
            <label for="confirmPassword" class="sr-only"
              >Confirmer le mot de passe</label
            >
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="input-field"
              placeholder="Confirmer le mot de passe"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Créer un compte
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  methods: {
    async handleRegister() {
      try {
        if (this.form.password !== this.form.confirmPassword) {
          this.$toast.error('Les mots de passe ne correspondent pas')
          return
        }

        await this.$axios.post('/api/auth/register', {
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

        this.$router.push('/dashboard')
      } catch (error) {
        this.$toast.error("Erreur lors de l'inscription")
      }
    },
  },
}
</script>
