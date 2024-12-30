<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-14">
          <!-- Logo et navigation principale -->
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <nuxt-link to="/" class="text-xl font-bold text-emerald-500">
                Troov
              </nuxt-link>
            </div>
            <div
              v-if="$auth.loggedIn"
              class="hidden sm:ml-6 sm:flex sm:space-x-8"
            >
              <nuxt-link
                to="/dashboard"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-emerald-500"
                active-class="text-emerald-500"
              >
                Dashboard
              </nuxt-link>
              <nuxt-link
                to="/objets"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-emerald-500"
                active-class="text-emerald-500"
              >
                Objets
              </nuxt-link>
            </div>
          </div>

          <!-- Menu utilisateur -->
          <div class="ml-4 flex items-center">
            <!-- Boutons Connexion/Inscription si non connecté -->
            <template v-if="!$auth.loggedIn">
              <nuxt-link
                to="/login"
                class="text-sm font-medium text-gray-500 hover:text-emerald-500 mr-4"
              >
                Connexion
              </nuxt-link>
              <nuxt-link
                to="/register"
                class="text-sm font-medium text-emerald-500 hover:text-emerald-600"
              >
                Inscription
              </nuxt-link>
            </template>

            <!-- Menu avatar si connecté -->
            <div v-else class="relative">
              <button
                @click="toggleUserMenu"
                type="button"
                class="flex items-center space-x-2 text-sm focus:outline-none"
              >
                <div class="flex items-center">
                  <img
                    class="h-8 w-8 rounded-full"
                    :src="`https://ui-avatars.com/api/?name=${$auth.user.firstName}+${$auth.user.lastName}&background=random`"
                    :alt="$auth.user.firstName"
                  />
                  <span class="ml-2 text-gray-500"
                    >{{ $auth.user.firstName }} {{ $auth.user.lastName }}</span
                  >
                  <svg
                    class="ml-2 h-5 w-5 text-gray-400 transition-transform duration-200"
                    :class="{ 'transform rotate-180': showUserMenu }"
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
                </div>
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
                  v-show="showUserMenu"
                  class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50"
                >
                  <nuxt-link
                    to="/profile"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="showUserMenu = false"
                  >
                    <svg
                      class="mr-3 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Accueil
                  </nuxt-link>
                  <button
                    @click="handleLogout"
                    class="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <svg
                      class="mr-3 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Déconnexion
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenu principal -->
    <main class="py-6">
      <nuxt />
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
  methods: {
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu
    },
    async handleLogout() {
      try {
        await this.$auth.logout()
        this.showUserMenu = false
        this.$router.push('/login')
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
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeUserMenu)
  },
}
</script>

<style>
.router-link-active {
  @apply text-emerald-500;
}
</style>
