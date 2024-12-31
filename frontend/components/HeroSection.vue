<template>
  <section class="pt-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1
            class="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight"
          >
            UN DÉVELOPPEUR PERDU<br />
            SE TRANSFORME SOUVENT<br />
            <span class="text-primary-500"> EN DÉVELOPPEUR TROOVÉ !</span>
          </h1>
          <div class="mt-8 flex flex-wrap gap-4">
            <nuxt-link
              to="/lost"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              J'AI PERDU
            </nuxt-link>
          </div>
        </div>

        <div class="hidden lg:block">
          <img
            src="~/assets/images/hero.svg"
            alt="Illustration"
            class="w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
}
</script>
