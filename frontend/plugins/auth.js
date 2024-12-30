export default function ({ $auth }) {
  if (process.client) {
    $auth.$storage.watchState('loggedIn', (newValue) => {
      if (newValue) {
        // Force le rafraîchissement des données utilisateur
        $auth.fetchUser()
      }
    })
  }
}
