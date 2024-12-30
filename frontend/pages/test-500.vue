<template>
  <div>Test erreur 500</div>
</template>

<script>
export default {
  name: 'Test500Page',
  asyncData() {
    // Génère volontairement une erreur
    throw new Error('Test erreur 500')
  },
}
</script>
