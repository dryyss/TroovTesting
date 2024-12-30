<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>

      <div class="space-y-8">
        <!-- Kanban -->
        <KanbanBoard />

        <!-- Calendrier -->
        <Calendar />
      </div>
    </div>
  </div>
</template>

<script>
import KanbanBoard from '~/components/KanbanBoard.vue'
import Calendar from '~/components/Calendar.vue'

export default {
  name: 'DashboardPage',
  components: {
    KanbanBoard,
    Calendar,
  },
  middleware: 'auth',
}
</script>
