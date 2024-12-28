<template>
  <div class="auth-form">
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Email:" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Entrez votre email"
        />
      </b-form-group>

      <b-form-group label="Mot de passe:" label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="Entrez votre mot de passe"
        />
      </b-form-group>

      <b-button type="submit" variant="primary">{{ submitText }}</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'AuthForm',
  props: {
    submitText: {
      type: String,
      default: 'Connexion',
    },
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.form)
    },
  },
}
</script>
