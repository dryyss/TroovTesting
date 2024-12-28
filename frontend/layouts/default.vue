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
                  to="/boutique"
                  class="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium"
                >
                  Boutique
                </nuxt-link>
                <nuxt-link
                  to="/livre-blanc"
                  class="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium"
                >
                  Livre blanc
                </nuxt-link>
                <nuxt-link
                  to="/offres-pro"
                  class="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium"
                >
                  Offres Pro
                </nuxt-link>
                <nuxt-link
                  to="/faq"
                  class="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium"
                >
                  F.A.Q
                </nuxt-link>
                <nuxt-link
                  to="/blog"
                  class="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium"
                >
                  Blog
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <button
                class="flex items-center space-x-2 text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium"
                @click="showUserMenu = !showUserMenu"
              >
                <span>Andrys MAGAR</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="~/assets/images/avatar.svg"
                  alt=""
                />
              </button>
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div class="py-1">
                  <nuxt-link
                    to="/account"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Accueil
                  </nuxt-link>
                  <button
                    @click="logout"
                    class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
            <img class="h-6 w-6" src="~/assets/images/fr-flag.svg" alt="FR" />
          </div>
        </div>
      </div>
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
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>
