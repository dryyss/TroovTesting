<template>
  <div class="p-6">
    <div class="flex space-x-4 overflow-x-auto">
      <div
        v-for="status in statuses"
        :key="status.value"
        class="flex-none w-80 bg-gray-50 rounded-lg p-4"
      >
        <h3 class="text-lg font-medium mb-4">{{ status.label }}</h3>
        <draggable
          v-model="columns[status.value]"
          group="objects"
          class="space-y-3 min-h-[200px]"
          @change="onDragChange"
        >
          <div
            v-for="object in columns[status.value]"
            :key="object._id"
            class="bg-white p-4 rounded-lg shadow cursor-move hover:shadow-md transition-shadow"
          >
            <h4 class="font-medium">{{ object.name }}</h4>
            <p class="text-sm text-gray-600 mt-1">{{ object.description }}</p>
            <div class="mt-3">
              <button
                class="text-sm px-3 py-1 text-primary-600 border border-primary-600 rounded-full hover:bg-primary-50"
                @click="openAppointmentModal(object)"
              >
                Rendez-vous
              </button>
            </div>
          </div>
        </draggable>
      </div>
    </div>

    <!-- Modal pour les rendez-vous -->
    <div v-if="showAppointmentModal" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-md w-full p-6">
          <h3 class="text-lg font-medium mb-4">Planifier un rendez-vous</h3>
          <form @submit.prevent="saveAppointment">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Date et heure
                </label>
                <input
                  v-model="appointmentForm.date"
                  type="datetime-local"
                  class="mt-1 input-field"
                  :min="new Date().toISOString().slice(0, 16)"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  v-model="appointmentForm.description"
                  rows="3"
                  class="mt-1 input-field"
                ></textarea>
              </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                @click="showAppointmentModal = false"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm text-white bg-primary-600 hover:bg-primary-700 rounded-md"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'KanbanBoard',
  components: {
    draggable,
  },
  data() {
    return {
      statuses: [
        { value: 'todo', label: 'À faire' },
        { value: 'in_progress', label: 'En cours' },
        { value: 'done', label: 'Terminé' },
      ],
      columns: {
        todo: [],
        in_progress: [],
        done: [],
      },
      showAppointmentModal: false,
      selectedObject: null,
      appointmentForm: {
        date: '',
        description: '',
      },
    }
  },
  methods: {
    async onDragChange({ added, moved }) {
      if (added) {
        const object = added.element
        const newStatus = added.newIndex
        await this.updateObjectStatus(object._id, newStatus)
      }
    },
    openAppointmentModal(object) {
      this.selectedObject = object
      this.showAppointmentModal = true
    },
    async saveAppointment() {
      try {
        await this.$axios.post(
          `/api/objects/${this.selectedObject._id}/appointments`,
          this.appointmentForm
        )
        this.$toast.success('Rendez-vous planifié avec succès')
        this.showAppointmentModal = false
      } catch (error) {
        this.$toast.error('Erreur lors de la planification')
      }
    },
  },
}
</script>
