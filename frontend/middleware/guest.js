export default function ({ $auth, redirect }) {
  // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
  if ($auth.loggedIn) {
    return redirect('/dashboard')
  }
}
