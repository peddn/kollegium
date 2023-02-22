<script setup>
  import { useUserStore } from '../../stores/user.js'

  import AccessDenied from './AccessDenied.vue'

  const userStore = useUserStore()
</script>

<template>
  <div v-if="userStore.authenticated">
    <h1>Account</h1>
    <p>{{ userStore.user.username }}</p>
  </div>
  <div v-else>
    <AccessDenied />
  </div>
</template>
