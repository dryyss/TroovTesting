<template>
  <div class="container py-5">
    <b-jumbotron
      header="Bienvenue sur Troov"
      lead="Gérez vos objets simplement"
    >
      <template #actions>
        <b-button v-if="!$auth.loggedIn" to="/login" variant="primary">
          Connexion
        </b-button>
        <b-button v-else to="/objects" variant="success"> Mes Objets </b-button>
      </template>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
