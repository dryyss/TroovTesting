<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand to="/">Troov</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="$auth.loggedIn">
            <b-nav-item to="/objects">Mes objets</b-nav-item>
            <b-nav-item @click="logout">Déconnexion</b-nav-item>
          </template>
          <template v-else>
            <b-nav-item to="/login">Connexion</b-nav-item>
            <b-nav-item to="/register">Inscription</b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <main class="py-4">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>
