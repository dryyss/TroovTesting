<template>
  <div class="min-h-screen bg-gray-50">
    <TheNavbar class="sticky top-0 z-50 bg-white" />
    <main class="pt-4">
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
