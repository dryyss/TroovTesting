<template>
  <div class="relative bg-[#E5F6FF] min-h-screen overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative z-10 py-12 md:py-16 lg:py-20 xl:py-24">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <div class="sm:text-center lg:text-left lg:col-span-7">
            <h1
              class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span class="block text-[#2D3748]">UN OBJET PERDU</span>
              <span class="block text-[#2D3748]">SE TRANSFORME SOUVENT</span>
              <span class="block text-primary-500">EN OBJET TROUVÉ !</span>
            </h1>
            <p class="mt-6 text-lg text-[#00B38A] sm:mt-8 sm:max-w-xl lg:mx-0">
              Vous avez perdu ou trouvé un objet ?
              <br />
              Déclarez-le et la communauté se mobilise pour vous aider à le
              retrouver.
            </p>
            <div
              class="mt-8 sm:mt-12 sm:flex sm:justify-center lg:justify-start space-x-4"
            >
              <div>
                <nuxt-link
                  to="/lost"
                  class="w-full flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-[#00E5B0] hover:bg-[#00B38A] transition-colors duration-200"
                >
                  J'AI PERDU
                </nuxt-link>
              </div>
              <div>
                <nuxt-link
                  to="/found"
                  class="w-full flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-[#00E5B0] bg-white border-2 border-[#00E5B0] hover:bg-[#E5F6FF] transition-colors duration-200"
                >
                  J'AI TROUVÉ
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="mt-12 lg:mt-0 lg:col-span-5">
            <div class="relative mx-auto w-full max-w-md lg:max-w-none">
              <img
                src="~/assets/images/hero.svg"
                alt="Illustration Troov"
                class="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
