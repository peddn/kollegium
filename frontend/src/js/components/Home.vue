<script setup>
import {useRoute} from 'vue-router'
import {useAppStore} from '../stores/app.js'

const appStore = useAppStore()

// set corresponding menu item to active
const route = useRoute()
appStore.setMenuItemActive(route.name)
</script>

<template>
  <h2 class="uk-heading-divider">Home</h2>
</template>
