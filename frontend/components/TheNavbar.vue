<template>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <nuxt-link to="/" class="flex-shrink-0 flex items-center">
            <img
              class="h-8 w-auto"
              src="~/assets/images/logo.png"
              alt="Troov"
            />
          </nuxt-link>
        </div>

        <div class="flex items-center space-x-4">
          <template v-if="$auth.loggedIn">
            <nuxt-link
              to="/dashboard"
              class="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'text-primary-500': $route.path === '/dashboard' }"
            >
              Tableau de bord
            </nuxt-link>
            <nuxt-link
              to="/profile"
              class="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'text-primary-500': $route.path === '/profile' }"
            >
              Mon Profil
            </nuxt-link>
            <button
              @click="handleLogout"
              class="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Déconnexion
            </button>
          </template>
          <template v-else>
            <nuxt-link
              to="/login"
              class="text-gray-700 hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'text-primary-500': $route.path === '/login' }"
            >
              Connexion
            </nuxt-link>
            <nuxt-link
              to="/register"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
            >
              Inscription
            </nuxt-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar',
  methods: {
    async handleLogout() {
      try {
        await this.$auth.logout()
        this.$router.push('/login')
        this.$toast.success('Déconnexion réussie')
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
        this.$toast.error('Erreur lors de la déconnexion')
      }
    },
  },
  watch: {
    // Surveiller les changements d'état d'authentification
    '$auth.loggedIn'(newValue) {
      // Force la mise à jour du composant
      this.$forceUpdate()
    },
  },
}
</script>
