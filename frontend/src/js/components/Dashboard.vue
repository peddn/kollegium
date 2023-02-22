<script setup>
  import { onBeforeRouteLeave } from 'vue-router'
  import { useAppStore } from '../stores/app.js'
  const appStore = useAppStore()
  onBeforeRouteLeave((to, from) => {
    appStore.setMenuItemActive(to.name)
  })
</script>

<template>
  <h1>Dashboard</h1>
</template>
