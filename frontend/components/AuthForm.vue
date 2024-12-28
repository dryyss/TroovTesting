<template>
  <div class="auth-form">
    <form @submit.prevent="onSubmit" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700"
          >Email</label
        >
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="input-field mt-1"
          placeholder="Entrez votre email"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700"
          >Mot de passe</label
        >
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          class="input-field mt-1"
          placeholder="Entrez votre mot de passe"
        />
      </div>

      <button type="submit" class="btn-primary w-full">
        {{ submitText }}
      </button>
    </form>
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
