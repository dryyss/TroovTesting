<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar fixe -->
    <nav class="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <nuxt-link to="/" class="text-xl font-bold text-primary-600">
                Troov
              </nuxt-link>
            </div>
          </div>

          <div class="flex items-center">
            <div class="hidden md:ml-4 md:flex md:items-center md:space-x-4">
              <template v-if="isAuthenticated">
                <nuxt-link
                  to="/dashboard"
                  class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Dashboard
                </nuxt-link>
                <nuxt-link
                  to="/objects"
                  class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Mes objets
                </nuxt-link>
              </template>
            </div>

            <!-- Menu utilisateur -->
            <div class="ml-4 relative flex items-center space-x-4">
              <div v-if="isAuthenticated && currentUser" class="relative">
                <button
                  @click="showUserMenu = !showUserMenu"
                  class="flex items-center space-x-2 text-sm focus:outline-none"
                >
                  <img
                    class="h-8 w-8 rounded-full bg-gray-200"
                    :src="`https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.lastName}&background=random`"
                    :alt="currentUser.firstName"
                  />
                  <span class="hidden md:block font-medium text-gray-700">
                    {{ currentUser.firstName }}
                  </span>
                  <svg
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <!-- Menu déroulant -->
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <div
                    v-if="showUserMenu"
                    class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-60"
                  >
                    <div class="py-1">
                      <nuxt-link
                        to="/profile"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Mon profil
                      </nuxt-link>
                      <button
                        @click="handleLogout"
                        class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Déconnexion
                      </button>
                    </div>
                  </div>
                </transition>
              </div>
              <template v-else>
                <nuxt-link
                  to="/login"
                  class="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Connexion
                </nuxt-link>
                <nuxt-link
                  to="/register"
                  class="text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-full"
                >
                  S'inscrire
                </nuxt-link>
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenu principal avec padding-top pour compenser la navbar fixe -->
    <main class="pt-16">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      showUserMenu: false,
    }
  },
  computed: {
    isAuthenticated() {
      return this.$auth.loggedIn
    },
    currentUser() {
      return this.$auth.user
    },
  },
  watch: {
    isAuthenticated: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.$auth.fetchUser()
        }
      },
    },
  },
  methods: {
    async handleLogout() {
      try {
        this.showUserMenu = false
        await this.$auth.logout()

        // Forcer la redirection après la déconnexion
        this.$router.push('/login')

        // Afficher un message de succès
        this.$toast.success('Déconnexion réussie')
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error)
        this.$toast.error('Erreur lors de la déconnexion')
      }
    },
    closeUserMenu(e) {
      if (!this.$el.contains(e.target)) {
        this.showUserMenu = false
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.closeUserMenu)
    // Force le rafraîchissement des données utilisateur au montage
    if (this.isAuthenticated) {
      this.$auth.fetchUser()
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeUserMenu)
  },
}
</script>

<style>
/* Assure que la navbar reste au-dessus de tout */
.z-50 {
  z-index: 50;
}

/* Assure que le menu déroulant reste au-dessus de la navbar */
.z-60 {
  z-index: 60;
}

/* Animation pour le menu déroulant */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter,
.dropdown-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
