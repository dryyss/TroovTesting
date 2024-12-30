export default function ({ $auth, $toast, redirect }) {
  $auth.onError((error, name, endpoint) => {
    console.error("Erreur d'authentification:", error)

    if (error.response && error.response.status === 401) {
      $toast.error('Session expirée. Veuillez vous reconnecter.')
      $auth.logout()
      redirect('/login')
      return
    }

    const message =
      (error.response && error.response.data && error.response.data.message) ||
      'Une erreur est survenue'
    $toast.error(message)
  })

  $auth.onRedirect((to, from) => {
    console.log('Redirection:', { to, from })
    return to
  })
}
