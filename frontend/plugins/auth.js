export default function (context) {
  // Ici vous pouvez ajouter une logique personnalisée
  // pour gérer l'authentification
  const { $auth } = context

  if (!$auth.loggedIn) {
    return
  }

  // Log l'utilisateur connecté
  console.log('Utilisateur connecté:', $auth.user)
}
