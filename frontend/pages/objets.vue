<template>
  <div class="min-h-screen bg-gray-50">
    <div class="py-10">
      <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">
            Mes Objets
          </h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <!-- Bouton Ajouter -->
          <div class="mb-6 mt-4">
            <button
              @click="showAddModal = true"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg
                class="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Ajouter un objet
            </button>
          </div>

          <!-- Liste des objets -->
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
              <li v-for="objet in objets" :key="objet.id">
                <div class="px-4 py-4 flex items-center sm:px-6">
                  <div
                    class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between"
                  >
                    <div>
                      <div class="flex text-sm">
                        <p class="font-medium text-primary-600 truncate">
                          {{ objet.nom }}
                        </p>
                      </div>
                      <div class="mt-2 flex">
                        <div class="flex items-center text-sm text-gray-500">
                          <p>{{ objet.description }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="mt-4 flex-shrink-0 sm:mt-0">
                      <div class="flex space-x-4">
                        <button
                          @click="editObjet(objet)"
                          class="text-primary-600 hover:text-primary-900"
                        >
                          Modifier
                        </button>
                        <button
                          @click="deleteObjet(objet.id)"
                          class="text-red-600 hover:text-red-900"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ObjetsPage',
  middleware: 'auth',
  data() {
    return {
      objets: [
        {
          id: 1,
          nom: "Exemple d'objet",
          description: "Description de l'objet",
        },
      ],
      showAddModal: false,
    }
  },
  methods: {
    editObjet(objet) {
      console.log('Éditer objet:', objet)
    },
    deleteObjet(id) {
      console.log('Supprimer objet:', id)
    },
  },
}
</script>
