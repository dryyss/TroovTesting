<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold text-gray-900">Kanban</h2>
      <button
        @click="addNewTask"
        class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <svg
          class="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Nouvelle tâche
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- À faire -->
      <div
        class="bg-gray-50 p-4 rounded-lg"
        @dragover.prevent
        @drop.prevent="onDrop($event, 'todo')"
      >
        <h3 class="font-medium text-gray-900 mb-4">À faire</h3>
        <div class="space-y-2">
          <div
            v-for="task in todoTasks"
            :key="task._id"
            class="bg-white p-3 rounded shadow-sm cursor-move group"
            draggable="true"
            @dragstart="onDragStart($event, task)"
          >
            <div class="flex justify-between items-start">
              <div class="flex-grow" @click="editTask(task)">
                <h4 class="text-sm font-medium text-gray-900">
                  {{ task.title }}
                </h4>
                <p class="text-sm text-gray-500 mt-1">{{ task.description }}</p>
              </div>
              <button
                @click="deleteTask(task)"
                class="hidden group-hover:block p-1 hover:bg-red-100 rounded-full text-red-600"
                title="Supprimer la tâche"
              >
                <svg
                  class="h-4 w-4"
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
        </div>
      </div>

      <!-- En cours -->
      <div
        class="bg-gray-50 p-4 rounded-lg"
        @dragover.prevent
        @drop.prevent="onDrop($event, 'in-progress')"
      >
        <h3 class="font-medium text-gray-900 mb-4">En cours</h3>
        <div class="space-y-2">
          <div
            v-for="task in inProgressTasks"
            :key="task._id"
            class="bg-white p-3 rounded shadow-sm cursor-move group"
            draggable="true"
            @dragstart="onDragStart($event, task)"
          >
            <div class="flex justify-between items-start">
              <div class="flex-grow" @click="editTask(task)">
                <h4 class="text-sm font-medium text-gray-900">
                  {{ task.title }}
                </h4>
                <p class="text-sm text-gray-500 mt-1">{{ task.description }}</p>
              </div>
              <button
                @click="deleteTask(task)"
                class="hidden group-hover:block p-1 hover:bg-red-100 rounded-full text-red-600"
                title="Supprimer la tâche"
              >
                <svg
                  class="h-4 w-4"
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
        </div>
      </div>

      <!-- Terminé -->
      <div
        class="bg-gray-50 p-4 rounded-lg"
        @dragover.prevent
        @drop.prevent="onDrop($event, 'done')"
      >
        <h3 class="font-medium text-gray-900 mb-4">Terminé</h3>
        <div class="space-y-2">
          <div
            v-for="task in doneTasks"
            :key="task._id"
            class="bg-white p-3 rounded shadow-sm cursor-move group"
            draggable="true"
            @dragstart="onDragStart($event, task)"
          >
            <div class="flex justify-between items-start">
              <div class="flex-grow" @click="editTask(task)">
                <h4 class="text-sm font-medium text-gray-900">
                  {{ task.title }}
                </h4>
                <p class="text-sm text-gray-500 mt-1">{{ task.description }}</p>
              </div>
              <button
                @click="deleteTask(task)"
                class="hidden group-hover:block p-1 hover:bg-red-100 rounded-full text-red-600"
                title="Supprimer la tâche"
              >
                <svg
                  class="h-4 w-4"
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
        </div>
      </div>
    </div>

    <!-- Modal nouvelle/édition tâche -->
    <div
      v-if="showTaskModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingTask ? 'Modifier la tâche' : 'Nouvelle tâche' }}
          </h3>
          <button
            @click="closeTaskModal"
            class="text-gray-400 hover:text-gray-500"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <TaskForm
          :task="editingTask"
          @submit="saveTask"
          @cancel="closeTaskModal"
          @delete="deleteTask(editingTask)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TaskForm from './TaskForm.vue'

export default {
  name: 'Kanban',
  components: {
    TaskForm
  },
  data() {
    return {
      showTaskModal: false,
      editingTask: null,
      tasks: []
    }
  },
  computed: {
    todoTasks() {
      return this.tasks.filter((task) => task.status === 'todo')
    },
    inProgressTasks() {
      return this.tasks.filter((task) => task.status === 'in-progress')
    },
    doneTasks() {
      return this.tasks.filter((task) => task.status === 'done')
    },
  },
  async created() {
    await this.fetchTasks()
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await this.$axios.$get('/api/tasks')
        this.tasks = response.tasks
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error)
        this.$toast.error('Erreur lors de la récupération des tâches')
      }
    },
    addNewTask() {
      this.editingTask = null
      this.currentTask = {
        title: '',
        description: '',
        status: 'todo'
      }
      this.showTaskModal = true
    },
    editTask(task) {
      this.editingTask = task
      this.currentTask = {
        ...task,
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'todo'
      }
      this.showTaskModal = true
    },
    closeTaskModal() {
      this.showTaskModal = false
      this.editingTask = null
      this.currentTask = {
        title: '',
        description: '',
        status: 'todo',
      }
    },
    async saveTask(taskData) {
      try {
        if (taskData._id) {
          // Mise à jour
          const response = await this.$axios.$put(
            `/api/tasks/${taskData._id}`,
            taskData
          )
          const index = this.tasks.findIndex(t => t._id === taskData._id)
          if (index !== -1) {
            this.tasks.splice(index, 1, response.task)
          }
          this.$toast.success('Tâche mise à jour avec succès')
        } else {
          // Création
          const response = await this.$axios.$post('/api/tasks', taskData)
          this.tasks.push(response.task)
          this.$toast.success('Tâche créée avec succès')
        }
        this.closeTaskModal()
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la tâche:', error)
        this.$toast.error('Erreur lors de la sauvegarde de la tâche')
      }
    },
    onDragStart(event, task) {
      event.dataTransfer.setData('taskId', task._id)
    },
    async onDrop(event, newStatus) {
      const taskId = event.dataTransfer.getData('taskId')
      const task = this.tasks.find((t) => t._id === taskId)

      if (task && task.status !== newStatus) {
        try {
          const response = await this.$axios.$put(`/api/tasks/${taskId}`, {
            ...task,
            status: newStatus,
          })
          const index = this.tasks.findIndex((t) => t._id === taskId)
          if (index !== -1) {
            this.tasks.splice(index, 1, response.task)
          }
        } catch (error) {
          console.error('Erreur lors du déplacement de la tâche:', error)
          this.$toast.error('Erreur lors du déplacement de la tâche')
        }
      }
    },
    async deleteTask(task) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) return

      try {
        await this.$axios.$delete(`/api/tasks/${task._id}`)
        const index = this.tasks.findIndex((t) => t._id === task._id)
        if (index !== -1) {
          this.tasks.splice(index, 1)
        }
        this.$toast.success('Tâche supprimée avec succès')
      } catch (error) {
        console.error('Erreur lors de la suppression de la tâche:', error)
        this.$toast.error('Erreur lors de la suppression de la tâche')
      }
    },
  },
}
</script>
