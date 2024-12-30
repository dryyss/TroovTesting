<template>
  <div
    class="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 text-center">
      <div class="space-y-4">
        <h1 class="text-6xl font-bold" :class="errorClass">
          Error {{ error.statusCode }}
        </h1>
        <h2 class="text-2xl font-semibold text-gray-700">
          {{ errorMessage }}
        </h2>
        <p class="text-gray-500">
          {{ error.message || suggestionMessage }}
        </p>
      </div>

      <!-- Image d'illustration -->
      <div class="relative h-64 w-full">
        <img
          :src="
            require(`~/assets/images/${
              error.statusCode === 404 ? 'error-404.webp' : 'error-500.png'
            }`)
          "
          :alt="'Illustration erreur ' + error.statusCode"
          class="absolute inset-0 w-full h-full object-contain"
        />
      </div>

      <!-- Bouton de retour -->
      <div class="mt-8">
        <button
          @click="$router.push('/')"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-sm"
          :class="buttonClass"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorClass() {
      return {
        'text-red-500': this.error.statusCode === 404,
        'text-orange-500': this.error.statusCode === 500,
      }
    },
    buttonClass() {
      return {
        'bg-red-600 hover:bg-red-700': this.error.statusCode === 404,
        'bg-orange-600 hover:bg-orange-700': this.error.statusCode === 500,
      }
    },
    errorMessage() {
      return this.error.statusCode === 404
        ? 'Page non trouvée'
        : 'Une erreur est survenue'
    },
    suggestionMessage() {
      return this.error.statusCode === 404
        ? "La page que vous recherchez n'existe pas ou a été déplacée."
        : 'Nous travaillons à résoudre le problème. Veuillez réessayer plus tard.'
    },
  },
  layout: 'empty', // Utilise une mise en page vide pour les erreurs
}
</script>
