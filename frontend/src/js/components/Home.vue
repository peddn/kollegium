<script setup>
import {useRoute} from 'vue-router'
import {useAppStore} from '../stores/app.js'

const appStore = useAppStore()

// set corresponding menu item to active
const route = useRoute()
appStore.setMenuItemActive(route.name)
</script>

<template>
  <div class="uk-section">
    <div class="uk-container">
      <h2>Home</h2>
    </div>
  </div>
</template>
