<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">
        Titre <span class="text-red-500">*</span>
      </label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        required
        minlength="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        placeholder="Entrez le titre de la tâche"
        @input="validateTitle"
      />
      <p v-if="errors.title" class="mt-1 text-sm text-red-600">
        {{ errors.title }}
      </p>
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        id="description"
        v-model="form.description"
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        placeholder="Décrivez la tâche en détail"
      ></textarea>
    </div>

    <div>
      <label for="status" class="block text-sm font-medium text-gray-700">
        Statut
      </label>
      <select
        id="status"
        v-model="form.status"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
      >
        <option value="todo">À faire</option>
        <option value="in-progress">En cours</option>
        <option value="done">Terminé</option>
      </select>
    </div>

    <div class="mt-5 flex justify-end space-x-3">
      <button
        v-if="task"
        type="button"
        @click="$emit('delete')"
        class="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Supprimer
      </button>
      <button
        type="button"
        @click="$emit('cancel')"
        class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Annuler
      </button>
      <button
        type="submit"
        :disabled="!isValid"
        class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-500 border border-transparent rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ task ? 'Enregistrer' : 'Créer' }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    task: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        status: 'todo',
      },
      errors: {
        title: '',
      },
    }
  },
  computed: {
    isValid() {
      return this.form.title.length >= 3 && !this.errors.title
    },
  },
  watch: {
    task: {
      immediate: true,
      handler(newTask) {
        if (newTask) {
          this.form = {
            title: newTask.title || '',
            description: newTask.description || '',
            status: newTask.status || 'todo',
          }
        } else {
          this.form = {
            title: '',
            description: '',
            status: 'todo',
          }
        }
      },
    },
  },
  methods: {
    validateTitle() {
      if (this.form.title.length < 3) {
        this.errors.title = 'Le titre doit contenir au moins 3 caractères'
      } else {
        this.errors.title = ''
      }
    },
    onSubmit() {
      if (!this.isValid) return

      this.$emit('submit', {
        ...this.form,
        _id: this.task?._id,
      })
    },
  },
}
</script>
