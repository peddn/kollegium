<script setup>
  import { useRoute } from 'vue-router'

  import { useAppStore } from '../../stores/app.js'
  import { useUserStore } from '../../stores/user.js'
  import { useDashboardStore } from '../../stores/dashboard.js'

  import AccessDenied from '../user/AccessDenied.vue'

  const appStore = useAppStore()
  const userStore = useUserStore()
  const dashboardStore = useDashboardStore()

  // set corresponding menu item to active
  const route = useRoute()
  appStore.setMenuItemActive(route.name)
</script>

<template>
  <div v-if="userStore.authenticated">
    <div class="uk-container">
      <h2 class="uk-heading-divider uk-margin-top">
        {{ userStore.user.username }} - dashboard
      </h2>
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
