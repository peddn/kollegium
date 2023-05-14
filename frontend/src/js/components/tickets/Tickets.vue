<script setup>
  import { useRoute } from 'vue-router'

  import { useAppStore } from '../../stores/app.js'
  import { useUserStore } from '../../stores/user.js'

  import AccessDenied from '../user/AccessDenied.vue'

  const route = useRoute()

  const appStore = useAppStore()
  const userStore = useUserStore()

  // set corresponding menu item to active
  appStore.setMenuItemActive(route.name)
</script>

<template>
  <div v-if="userStore.authenticated">
    <div class="uk-container">
      <h2 class="uk-heading-divider uk-margin-top">
        {{ userStore.user.username }} - tickets
      </h2>
    </div>
    <div class="uk-section">
      <div class="uk-container">content</div>
    </div>
  </div>
  <div v-else>
    <div class="uk-section">
      <div class="uk-container">
        <AccessDenied />
      </div>
    </div>
  </div>
</template>
