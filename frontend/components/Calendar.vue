<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-900">Calendrier</h2>
      <button
        @click="showEventModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
      >
        Ajouter un événement
      </button>
    </div>

    <!-- Calendrier -->
    <FullCalendar
      ref="fullCalendar"
      :options="calendarOptions"
      class="calendar-container"
    />

    <!-- Modal d'ajout/modification d'événement -->
    <div v-if="showEventModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
        <div class="relative bg-white rounded-lg max-w-md w-full p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingEvent ? "Modifier l'événement" : 'Nouvel événement' }}
          </h3>
          <form @submit.prevent="saveEvent">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input
                  v-model="eventForm.title"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  v-model="eventForm.description"
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                ></textarea>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Date de début
                  </label>
                  <input
                    v-model="eventForm.start"
                    type="datetime-local"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">
                    Date de fin
                  </label>
                  <input
                    v-model="eventForm.end"
                    type="datetime-local"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Couleur
                </label>
                <select
                  v-model="eventForm.color"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="#4F46E5">Indigo</option>
                  <option value="#10B981">Vert</option>
                  <option value="#EF4444">Rouge</option>
                  <option value="#F59E0B">Orange</option>
                  <option value="#6366F1">Violet</option>
                </select>
              </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                @click="closeEventModal"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
              >
                {{ editingEvent ? 'Modifier' : 'Ajouter' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        locale: frLocale,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        },
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        events: [], // Les événements seront chargés ici
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventDrop: this.handleEventDrop,
        eventResize: this.handleEventResize,
      },
      showEventModal: false,
      editingEvent: null,
      eventForm: {
        title: '',
        description: '',
        start: '',
        end: '',
        color: '#4F46E5',
      },
    }
  },
  methods: {
    handleDateSelect(selectInfo) {
      this.eventForm.start = selectInfo.startStr
      this.eventForm.end = selectInfo.endStr
      this.showEventModal = true
    },
    handleEventClick(clickInfo) {
      this.editingEvent = clickInfo.event
      this.eventForm = {
        title: clickInfo.event.title,
        description: clickInfo.event.extendedProps.description || '',
        start: this.formatDateTime(clickInfo.event.start),
        end: this.formatDateTime(clickInfo.event.end),
        color: clickInfo.event.backgroundColor,
      }
      this.showEventModal = true
    },
    handleEventDrop(dropInfo) {
      // Ici, vous pouvez ajouter la logique pour sauvegarder le changement dans la base de données
      this.$emit('event-drop', {
        event: dropInfo.event,
        delta: dropInfo.delta,
      })
    },
    handleEventResize(resizeInfo) {
      // Ici, vous pouvez ajouter la logique pour sauvegarder le changement dans la base de données
      this.$emit('event-resize', {
        event: resizeInfo.event,
        startDelta: resizeInfo.startDelta,
        endDelta: resizeInfo.endDelta,
      })
    },
    formatDateTime(date) {
      if (!date) return ''
      return new Date(date).toISOString().slice(0, 16)
    },
    closeEventModal() {
      this.showEventModal = false
      this.editingEvent = null
      this.eventForm = {
        title: '',
        description: '',
        start: '',
        end: '',
        color: '#4F46E5',
      }
    },
    saveEvent() {
      const eventData = {
        title: this.eventForm.title,
        description: this.eventForm.description,
        start: new Date(this.eventForm.start),
        end: new Date(this.eventForm.end),
        backgroundColor: this.eventForm.color,
        borderColor: this.eventForm.color,
      }

      if (this.editingEvent) {
        // Modification d'un événement existant
        this.editingEvent.setProp('title', eventData.title)
        this.editingEvent.setExtendedProp('description', eventData.description)
        this.editingEvent.setStart(eventData.start)
        this.editingEvent.setEnd(eventData.end)
        this.editingEvent.setProp('backgroundColor', eventData.backgroundColor)
        this.editingEvent.setProp('borderColor', eventData.borderColor)
      } else {
        // Ajout d'un nouvel événement
        const calendarApi = this.$refs.fullCalendar.getApi()
        calendarApi.addEvent(eventData)
      }

      this.closeEventModal()
    },
  },
}
</script>

<style>
.calendar-container {
  height: 800px;
}

/* Styles pour FullCalendar */
.fc {
  font-family: inherit;
}

.fc .fc-button-primary {
  @apply bg-primary-600 border-primary-600 hover:bg-primary-700 hover:border-primary-700 focus:bg-primary-700 focus:border-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500;
}

.fc .fc-button-primary:not(:disabled).fc-button-active,
.fc .fc-button-primary:not(:disabled):active {
  @apply bg-primary-800 border-primary-800;
}

.fc .fc-daygrid-day.fc-day-today {
  @apply bg-primary-50;
}

.fc .fc-highlight {
  @apply bg-primary-100;
}

.fc a.fc-event {
  @apply cursor-pointer;
}
</style>
