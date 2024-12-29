<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white rounded-lg shadow p-6">
          <h1 class="text-2xl font-semibold text-gray-900">
            Bienvenue {{ $auth.user.firstName }}
          </h1>
          <p class="mt-2 text-gray-600">
            Vous êtes connecté avec l'email : {{ $auth.user.email }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
  middleware: 'auth',
}
</script>
