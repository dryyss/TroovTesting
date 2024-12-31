<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Mon Profil</h2>

      <form @submit.prevent="updateProfile" class="space-y-6">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700"
            >Prénom</label
          >
          <input
            id="firstName"
            v-model="form.firstName"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700"
            >Nom</label
          >
          <input
            id="lastName"
            v-model="form.lastName"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
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
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label
            for="currentPassword"
            class="block text-sm font-medium text-gray-700"
          >
            Mot de passe actuel
          </label>
          <input
            id="currentPassword"
            v-model="form.currentPassword"
            type="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label
            for="newPassword"
            class="block text-sm font-medium text-gray-700"
          >
            Nouveau mot de passe
          </label>
          <input
            id="newPassword"
            v-model="form.newPassword"
            type="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div v-if="error" class="rounded-md bg-red-50 p-4">
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  middleware: 'auth',
  data() {
    return {
      loading: false,
      error: null,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        currentPassword: '',
        newPassword: '',
      },
    }
  },
  created() {
    // Charger les données de l'utilisateur
    const user = this.$auth.user
    this.form.firstName = user.firstName
    this.form.lastName = user.lastName
    this.form.email = user.email
  },
  methods: {
    async updateProfile() {
      try {
        this.loading = true
        this.error = null

        const data = {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
        }

        if (this.form.currentPassword && this.form.newPassword) {
          data.currentPassword = this.form.currentPassword
          data.newPassword = this.form.newPassword
        }

        await this.$axios.$put('/api/auth/profile', data)
        await this.$auth.fetchUser()
        this.$toast.success('Profil mis à jour avec succès')
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          'Erreur lors de la mise à jour du profil'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
