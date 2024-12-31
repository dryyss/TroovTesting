export const state = () => ({})

export const mutations = {}

export const actions = {
  // Cette action sera appelée au démarrage de Nuxt
  async nuxtServerInit({ dispatch }, { req }) {
    if (this.$auth.loggedIn) {
      await this.$auth.fetchUser()
    }
  },
}
