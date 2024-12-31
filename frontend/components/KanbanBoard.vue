<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-900">Mes Tâches</h2>
      <button
        @click="showAddTaskModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
      >
        Ajouter une tâche
      </button>
    </div>

    <div class="flex space-x-4 overflow-x-auto pb-4">
      <!-- Colonnes du Kanban -->
      <div
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        class="flex-1 min-w-[300px] bg-gray-50 rounded-lg p-4"
      >
        <h3 class="font-medium text-gray-900 mb-4">
          {{ column.title }}
          <span class="ml-2 text-sm text-gray-500"
            >({{ column.tasks.length }})</span
          >
        </h3>

        <!-- Liste des tâches -->
        <draggable
          v-model="column.tasks"
          :group="'tasks'"
          :animation="200"
          class="space-y-3 min-h-[200px]"
          @end="onDragEnd"
        >
          <div
            v-for="task in column.tasks"
            :key="task.id"
            class="bg-white p-4 rounded shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
            @click="editTask(task)"
          >
            <div class="flex justify-between items-start">
              <h4 class="font-medium text-gray-900">{{ task.title }}</h4>
              <span
                :class="getPriorityClass(task.priority)"
                class="px-2 py-1 text-xs rounded-full"
              >
                {{ task.priority }}
              </span>
            </div>
            <p class="text-sm text-gray-600 mt-2">{{ task.description }}</p>
            <div class="flex justify-between items-center mt-3">
              <span class="text-xs text-gray-500">
                {{ formatDate(task.dueDate) }}
              </span>
              <button
                @click.stop="deleteTask(task)"
                class="text-red-600 hover:text-red-800"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
        </draggable>
      </div>
    </div>

    <!-- Modal d'ajout/modification de tâche -->
    <div v-if="showAddTaskModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
        <div class="relative bg-white rounded-lg max-w-md w-full p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingTask ? 'Modifier la tâche' : 'Nouvelle tâche' }}
          </h3>
          <form @submit.prevent="saveTask">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input
                  v-model="taskForm.title"
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
                  v-model="taskForm.description"
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Priorité
                </label>
                <select
                  v-model="taskForm.priority"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="Basse">Basse</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Haute">Haute</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Date d'échéance
                </label>
                <input
                  v-model="taskForm.dueDate"
                  type="date"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                @click="showAddTaskModal = false"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
              >
                {{ editingTask ? 'Modifier' : 'Ajouter' }}
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
      columns: [
        {
          title: 'À faire',
          tasks: [],
        },
        {
          title: 'En cours',
          tasks: [],
        },
        {
          title: 'Terminé',
          tasks: [],
        },
      ],
      showAddTaskModal: false,
      editingTask: null,
      taskForm: {
        title: '',
        description: '',
        priority: 'Moyenne',
        dueDate: '',
      },
    }
  },
  methods: {
    getPriorityClass(priority) {
      const classes = {
        Basse: 'bg-green-100 text-green-800',
        Moyenne: 'bg-yellow-100 text-yellow-800',
        Haute: 'bg-red-100 text-red-800',
      }
      return classes[priority]
    },
    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString()
    },
    onDragEnd() {
      // Ici, vous pouvez ajouter la logique pour sauvegarder l'état dans la base de données
      this.$emit('update:tasks', this.columns)
    },
    editTask(task) {
      this.editingTask = task
      this.taskForm = { ...task }
      this.showAddTaskModal = true
    },
    deleteTask(task) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        this.columns.forEach((column) => {
          const index = column.tasks.findIndex((t) => t.id === task.id)
          if (index !== -1) {
            column.tasks.splice(index, 1)
          }
        })
      }
    },
    saveTask() {
      if (this.editingTask) {
        // Modification d'une tâche existante
        this.columns.forEach((column) => {
          const task = column.tasks.find((t) => t.id === this.editingTask.id)
          if (task) {
            Object.assign(task, this.taskForm)
          }
        })
      } else {
        // Ajout d'une nouvelle tâche
        const newTask = {
          id: Date.now(),
          ...this.taskForm,
        }
        this.columns[0].tasks.push(newTask)
      }

      this.showAddTaskModal = false
      this.editingTask = null
      this.taskForm = {
        title: '',
        description: '',
        priority: 'Moyenne',
        dueDate: '',
      }
    },
  },
}
</script>
