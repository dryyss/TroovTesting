<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900">UN DÉVELOPPEUR PERDU</h2>
      <h3 class="text-2xl font-bold mt-2">SE TRANSFORME SOUVENT</h3>
      <h1 class="text-4xl font-bold text-primary-500 mt-2">
        EN DÉVELOPPEUR TROOVÉ !
      </h1>
      <p class="text-gray-600 mt-4">
        Bienvenue dans votre espace de travail, où les tâches perdues se
        transforment en succès !
      </p>
    </div>

    <!-- Section Kanban -->
    <div class="mb-8">
      <Kanban />
    </div>

    <!-- Section Calendrier -->
    <div>
      <Calendar />
    </div>
  </div>
</template>

<script>
import Kanban from '~/components/Kanban.vue'
import Calendar from '~/components/Calendar.vue'

export default {
  name: 'DashboardPage',
  components: {
    Kanban,
    Calendar,
  },
  middleware: 'auth',
}
</script>
