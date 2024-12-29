<template>
  <div class="flex space-x-4 p-4 overflow-x-auto">
    <div v-for="column in columns" :key="column.id" class="flex-none w-80">
      <div class="bg-gray-100 rounded-lg p-4">
        <h3 class="text-lg font-medium mb-4">{{ column.title }}</h3>
        <draggable
          v-model="column.items"
          group="items"
          :animation="200"
          ghost-class="ghost"
          class="space-y-2 min-h-[200px]"
        >
          <div
            v-for="item in column.items"
            :key="item.id"
            class="card cursor-move"
          >
            <h4 class="font-medium">{{ item.title }}</h4>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
          </div>
        </draggable>
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
          id: 1,
          title: 'À faire',
          items: [
            {
              id: 1,
              title: 'Tâche 1',
              description: 'Description de la tâche 1',
            },
            {
              id: 2,
              title: 'Tâche 2',
              description: 'Description de la tâche 2',
            },
          ],
        },
        {
          id: 2,
          title: 'En cours',
          items: [
            {
              id: 3,
              title: 'Tâche 3',
              description: 'Description de la tâche 3',
            },
          ],
        },
        {
          id: 3,
          title: 'Terminé',
          items: [
            {
              id: 4,
              title: 'Tâche 4',
              description: 'Description de la tâche 4',
            },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
