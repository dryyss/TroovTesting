<template>
  <div class="login-page">
    <b-container>
      <b-row class="justify-content-center">
        <b-col cols="12" md="6">
          <h1 class="text-center mb-4">Connexion</h1>
          <auth-form submit-text="Se connecter" @submit="handleLogin" />
          <div class="text-center mt-3">
            <nuxt-link to="/register">
              Pas encore de compte ? S'inscrire
            </nuxt-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  methods: {
    async handleLogin(formData) {
      try {
        await this.$auth.loginWith('local', {
          data: formData,
        })
        this.$router.push('/objects')
      } catch (error) {
        this.$bvToast.toast('Erreur de connexion', {
          title: 'Erreur',
          variant: 'danger',
          solid: true,
        })
      }
    },
  },
}
</script>
