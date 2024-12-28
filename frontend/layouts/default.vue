<template>
  <div>
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center">
            <nuxt-link to="/" class="flex-shrink-0">
              <img
                class="h-10 w-auto"
                src="~/assets/images/logo.png"
                alt="Troov"
              />
            </nuxt-link>
            <div class="hidden md:block ml-10">
              <div class="flex items-center space-x-8">
                <nuxt-link
                  v-for="item in menuItems"
                  :key="item.name"
                  :to="item.href"
                  class="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium"
                >
                  {{ item.name }}
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <template v-if="!$auth.loggedIn">
              <nuxt-link
                to="/login"
                class="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium"
              >
                Connexion
              </nuxt-link>
              <nuxt-link
                to="/register"
                class="bg-primary-500 text-white hover:bg-primary-600 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
              >
                Inscription
              </nuxt-link>
            </template>
            <div v-else class="relative ml-3">
              <div>
                <button
                  class="flex items-center space-x-3 text-gray-700 hover:text-primary-500"
                  @click="showUserMenu = !showUserMenu"
                >
                  <img
                    class="h-8 w-8 rounded-full ring-2 ring-primary-500"
                    :src="
                      $auth.user.avatar || require('~/assets/images/avatar.svg')
                    "
                    alt=""
                  />
                  <span class="text-sm font-medium">{{ $auth.user.name }}</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="showUserMenu"
                  class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div class="py-1">
                    <nuxt-link
                      to="/dashboard"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Tableau de bord
                    </nuxt-link>
                    <nuxt-link
                      to="/profile"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mon profil
                    </nuxt-link>
                    <button
                      @click="logout"
                      class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </transition>
            </div>
            <div class="flex items-center">
              <img class="h-6 w-6" src="~/assets/images/fr-flag.svg" alt="FR" />
            </div>
            <button
              class="md:hidden rounded-md p-2 text-gray-700 hover:text-primary-500 focus:outline-none"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  v-if="!isMobileMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <transition
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <nuxt-link
              v-for="item in menuItems"
              :key="item.name"
              :to="item.href"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
            >
              {{ item.name }}
            </nuxt-link>
          </div>
        </div>
      </transition>
    </nav>

    <main>
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
      isMobileMenuOpen: false,
      menuItems: [
        { name: 'Boutique', href: '/boutique' },
        { name: 'Livre blanc', href: '/livre-blanc' },
        { name: 'Offres Pro', href: '/offres-pro' },
        { name: 'F.A.Q', href: '/faq' },
        { name: 'Blog', href: '/blog' },
      ],
    }
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push('/')
        this.$toast.success('Déconnexion réussie')
      } catch (error) {
        this.$toast.error('Erreur lors de la déconnexion')
      }
    },
  },
}
</script>
