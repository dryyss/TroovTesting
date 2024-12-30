<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo et navigation principale -->
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <nuxt-link to="/" class="text-xl font-bold text-primary-600">
                Troov
              </nuxt-link>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <nuxt-link
                to="/dashboard"
                class="nav-link"
                active-class="nav-link-active"
              >
                Dashboard
              </nuxt-link>
              <nuxt-link
                to="/objets"
                class="nav-link"
                active-class="nav-link-active"
              >
                Objets
              </nuxt-link>
            </div>
          </div>

          <!-- Menu utilisateur -->
          <div class="ml-4 relative flex items-center">
            <div v-if="$auth.loggedIn" class="relative">
              <div class="relative">
                <button
                  @click="toggleUserMenu"
                  type="button"
                  class="flex items-center space-x-2 text-sm focus:outline-none"
                >
                  <img
                    class="h-8 w-8 rounded-full bg-gray-200"
                    :src="`https://ui-avatars.com/api/?name=${$auth.user.firstName}+${$auth.user.lastName}&background=random`"
                    :alt="$auth.user.firstName"
                  />
                  <span class="hidden md:block font-medium text-gray-700">
                    {{ $auth.user.firstName }}
                  </span>
                  <svg
                    class="h-5 w-5 text-gray-400"
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
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      @click="showUserMenu = false"
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
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenu principal -->
    <main>
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
.nav-link {
  @apply inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-primary-600;
}

.nav-link-active {
  @apply border-b-2 border-primary-500 text-gray-900;
}
</style>
