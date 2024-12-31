export default function ({ $auth }) {
  console.log('Plugin auth initialisé')

  $auth.onError((error, name, endpoint) => {
    console.log('=== ERREUR AUTH ===')
    console.log('Type:', name)
    console.log('Endpoint:', endpoint)
    console.error('Erreur:', error)

    if (error.response && error.response.status === 401) {
      console.log('Reset auth suite à une erreur 401')
      $auth.reset()
    }
  })

  $auth.onRedirect((to, from) => {
    console.log('=== REDIRECTION AUTH ===')
    console.log('De:', from)
    console.log('Vers:', to)
    return to
  })

  // Observer les changements d'état
  if (process.client) {
    $auth.$storage.watchState('loggedIn', (newValue) => {
      console.log('=== ÉTAT AUTH CHANGÉ ===')
      console.log('Connecté:', newValue)
      console.log('Token:', $auth.strategy.token.get())
      console.log('User:', $auth.user)
    })
  }
}
