<template>
  <div class="kanban-board">
    <div class="d-flex justify-content-between">
      <div v-for="status in statuses" :key="status.value" class="kanban-column">
        <h3 class="column-title">{{ status.label }}</h3>
        <div class="column-content">
          <draggable
            v-model="columns[status.value]"
            group="objects"
            @change="onDragChange"
          >
            <div
              v-for="object in columns[status.value]"
              :key="object._id"
              class="object-card"
            >
              <b-card>
                <h5>{{ object.name }}</h5>
                <p>{{ object.description }}</p>
                <div class="card-actions">
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    @click="openAppointmentModal(object)"
                  >
                    Rendez-vous
                  </b-button>
                </div>
              </b-card>
            </div>
          </draggable>
        </div>
      </div>
    </div>

    <!-- Modal pour les rendez-vous -->
    <b-modal
      v-model="showAppointmentModal"
      title="Planifier un rendez-vous"
      @ok="saveAppointment"
    >
      <b-form>
        <b-form-group label="Date et heure:">
          <b-form-datepicker v-model="appointmentForm.date" :min="new Date()" />
        </b-form-group>
        <b-form-group label="Description:">
          <b-form-textarea v-model="appointmentForm.description" rows="3" />
        </b-form-group>
      </b-form>
    </b-modal>
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
          {
            date: this.appointmentForm.date,
            description: this.appointmentForm.description,
          }
        )
        this.$bvToast.toast('Rendez-vous planifié avec succès', {
          title: 'Succès',
          variant: 'success',
        })
      } catch (error) {
        this.$bvToast.toast('Erreur lors de la planification', {
          title: 'Erreur',
          variant: 'danger',
        })
      }
    },
  },
}
</script>

<style scoped>
.kanban-board {
  padding: 20px;
  overflow-x: auto;
}

.kanban-column {
  min-width: 300px;
  margin: 0 10px;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px;
}

.column-title {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.column-content {
  min-height: 200px;
  padding: 10px;
}

.object-card {
  margin-bottom: 10px;
}
</style>
