export const state = () => ({})

export const mutations = {}

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    if (req.headers.cookie) {
      try {
        await dispatch('auth/fetch')
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des données utilisateur:',
          error
        )
      }
    }
  },
}
