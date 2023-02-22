<script setup>
  import { useUserStore } from '../stores/user.js'

  import AccessDenied from './user/AccessDenied.vue'

  const userStore = useUserStore()
</script>

<template>
  <div v-if="userStore.authenticated">
    <h1>{{ userStore.user.username }}'s dashboard</h1>
  </div>
  <div v-else>
    <AccessDenied />
  </div>
</template>
