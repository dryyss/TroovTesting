<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Calendrier</h2>
      <div class="flex space-x-2">
        <button
          @click="previousMonth"
          class="p-1 hover:bg-gray-100 rounded-full"
        >
          <svg
            class="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span class="text-gray-900 font-medium">
          {{ currentMonth }} {{ currentYear }}
        </span>
        <button @click="nextMonth" class="p-1 hover:bg-gray-100 rounded-full">
          <svg
            class="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-7 gap-1 mb-2">
      <template v-for="day in weekDays">
        <div
          :key="day"
          class="text-center text-sm font-medium text-gray-500 py-2"
        >
          {{ day }}
        </div>
      </template>
    </div>

    <div class="grid grid-cols-7 gap-1">
      <template v-for="(day, index) in days">
        <div
          :key="index"
          @click="selectDate(day)"
          :class="[
            'min-h-[80px] p-2 rounded hover:bg-gray-50 cursor-pointer relative',
            {
              'bg-gray-100': !day.isCurrentMonth,
              'bg-primary-50': isSelected(day),
              'bg-white': day.isCurrentMonth && !isSelected(day),
            },
          ]"
        >
          <span
            :class="[
              'inline-flex items-center justify-center w-6 h-6 rounded-full text-sm',
              {
                'text-gray-400': !day.isCurrentMonth,
                'bg-primary-500 text-white': isToday(day),
                'text-gray-900': day.isCurrentMonth && !isToday(day),
              },
            ]"
          >
            {{ day.number }}
          </span>

          <!-- Événements du jour -->
          <div class="mt-1 space-y-1">
            <div
              v-for="event in getEventsForDay(day)"
              :key="event._id"
              class="group flex items-center justify-between text-xs p-1 rounded bg-primary-100 text-primary-700 hover:bg-primary-200"
            >
              <span
                class="truncate cursor-pointer flex-grow"
                @click.stop="editEvent(event)"
              >
                {{ event.title }}
              </span>
              <button
                @click.stop="quickDeleteEvent(event)"
                class="hidden group-hover:block p-1 hover:bg-red-100 rounded-full text-red-600 ml-1"
                title="Supprimer l'événement"
              >
                <svg
                  class="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Indicateur d'événements supplémentaires -->
          <div
            v-if="getEventsForDay(day).length > 2"
            class="text-xs text-gray-500 mt-1"
          >
            +{{ getEventsForDay(day).length - 2 }} plus
          </div>
        </div>
      </template>
    </div>

    <!-- Modal événement -->
    <div
      v-if="showEventModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ editingEvent ? "Modifier l'événement" : 'Nouvel événement' }}
        </h3>
        <form @submit.prevent="saveEvent">
          <div class="space-y-4">
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-gray-700"
              >
                Titre
              </label>
              <input
                id="title"
                v-model="currentEvent.title"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                v-model="currentEvent.description"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label for="date" class="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                id="date"
                v-model="currentEvent.date"
                type="date"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
          </div>
          <div class="mt-5 flex justify-end space-x-3">
            <button
              v-if="editingEvent"
              type="button"
              @click="deleteEvent"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Supprimer
            </button>
            <button
              type="button"
              @click="closeEventModal"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-500 border border-transparent rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {{ editingEvent ? 'Enregistrer' : 'Créer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
      weekDays: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      showEventModal: false,
      editingEvent: null,
      currentEvent: {
        title: '',
        description: '',
        date: '',
      },
      events: [],
    }
  },
  computed: {
    currentMonth() {
      return this.currentDate.toLocaleString('fr-FR', { month: 'long' })
    },
    currentYear() {
      return this.currentDate.getFullYear()
    },
    days() {
      const days = []
      const date = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      )
      const lastDay = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        0
      )

      // Obtenir le premier jour du mois (0 = Dimanche, 1 = Lundi, etc.)
      let firstDayOfWeek = date.getDay()
      firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek // Ajuster pour commencer par Lundi

      // Ajouter les jours du mois précédent
      const prevMonth = new Date(date)
      prevMonth.setDate(0)
      const daysInPrevMonth = prevMonth.getDate()

      for (let i = firstDayOfWeek - 1; i > 0; i--) {
        days.push({
          number: daysInPrevMonth - i + 1,
          date: new Date(
            prevMonth.getFullYear(),
            prevMonth.getMonth(),
            daysInPrevMonth - i + 1
          ),
          isCurrentMonth: false,
        })
      }

      // Ajouter les jours du mois en cours
      for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push({
          number: i,
          date: new Date(date.getFullYear(), date.getMonth(), i),
          isCurrentMonth: true,
        })
      }

      // Ajouter les jours du mois suivant
      const remainingDays = 42 - days.length // 42 = 6 semaines * 7 jours
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          number: i,
          date: new Date(date.getFullYear(), date.getMonth() + 1, i),
          isCurrentMonth: false,
        })
      }

      return days
    },
  },
  async created() {
    await this.fetchEvents()
  },
  methods: {
    async fetchEvents() {
      try {
        const firstDay = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          1
        )
        const lastDay = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth() + 1,
          0
        )

        const response = await this.$axios.$get('/api/events', {
          params: {
            start: firstDay.toISOString(),
            end: lastDay.toISOString(),
          },
        })
        this.events = response.events
      } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error)
        this.$toast.error('Erreur lors de la récupération des événements')
      }
    },
    previousMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1
      )
      this.fetchEvents()
    },
    nextMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1
      )
      this.fetchEvents()
    },
    selectDate(day) {
      this.selectedDate = day.date
      this.currentEvent.date = day.date.toISOString().split('T')[0]
      this.showEventModal = true
    },
    isSelected(day) {
      if (!this.selectedDate) return false
      return this.selectedDate.toDateString() === day.date.toDateString()
    },
    isToday(day) {
      const today = new Date()
      return today.toDateString() === day.date.toDateString()
    },
    getEventsForDay(day) {
      return this.events.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate.toDateString() === day.date.toDateString()
      })
    },
    editEvent(event) {
      this.editingEvent = event
      this.currentEvent = {
        ...event,
        date: new Date(event.date).toISOString().split('T')[0],
      }
      this.showEventModal = true
    },
    closeEventModal() {
      this.showEventModal = false
      this.editingEvent = null
      this.currentEvent = {
        title: '',
        description: '',
        date: this.selectedDate
          ? this.selectedDate.toISOString().split('T')[0]
          : '',
      }
    },
    async saveEvent() {
      try {
        if (this.editingEvent) {
          // Mise à jour
          const response = await this.$axios.$put(
            `/api/events/${this.editingEvent._id}`,
            this.currentEvent
          )
          const index = this.events.findIndex(
            (e) => e._id === this.editingEvent._id
          )
          if (index !== -1) {
            this.events.splice(index, 1, response.event)
          }
          this.$toast.success('Événement mis à jour avec succès')
        } else {
          // Création
          const response = await this.$axios.$post(
            '/api/events',
            this.currentEvent
          )
          this.events.push(response.event)
          this.$toast.success('Événement créé avec succès')
        }
        this.closeEventModal()
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de l'événement:", error)
        this.$toast.error("Erreur lors de la sauvegarde de l'événement")
      }
    },
    async deleteEvent() {
      if (!this.editingEvent) return

      try {
        await this.$axios.$delete(`/api/events/${this.editingEvent._id}`)
        const index = this.events.findIndex(
          (e) => e._id === this.editingEvent._id
        )
        if (index !== -1) {
          this.events.splice(index, 1)
        }
        this.$toast.success('Événement supprimé avec succès')
        this.closeEventModal()
      } catch (error) {
        console.error("Erreur lors de la suppression de l'événement:", error)
        this.$toast.error("Erreur lors de la suppression de l'événement")
      }
    },
    async quickDeleteEvent(event) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return

      try {
        await this.$axios.$delete(`/api/events/${event._id}`)
        const index = this.events.findIndex((e) => e._id === event._id)
        if (index !== -1) {
          this.events.splice(index, 1)
        }
        this.$toast.success('Événement supprimé avec succès')
      } catch (error) {
        console.error("Erreur lors de la suppression de l'événement:", error)
        this.$toast.error("Erreur lors de la suppression de l'événement")
      }
    },
  },
}
</script>
