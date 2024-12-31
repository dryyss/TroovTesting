<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">Mes objets</h1>
        <button
          class="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700"
          @click="showAddModal = true"
        >
          Ajouter un objet
        </button>
      </div>
      <KanbanBoard />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ObjectsPage',
  middleware: 'auth',
  data() {
    return {
      showAddModal: false,
    }
  },
}
</script>
