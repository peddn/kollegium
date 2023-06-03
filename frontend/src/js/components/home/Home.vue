<script setup>
import {useRoute} from 'vue-router'
import {useAppStore} from '../../stores/app.js'

const appStore = useAppStore()

// set corresponding menu item to active
const route = useRoute()
appStore.setMenuItemActive(route.name)
</script>

<template>
  <h2 class="uk-heading-divider">Home</h2>
  <div
    class="uk-container uk-flex uk-flex-center uk-flex-middle app-min-height"
  >
    <div>
      <span uk-spinner="ratio: 2"></span>
    </div>
  </div>
</template>
