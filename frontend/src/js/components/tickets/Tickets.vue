<script setup>
import {onMounted} from 'vue'

import {useRoute} from 'vue-router'

import {useTicketStore} from '../../stores/ticket.js'
import {useAppStore} from '../../stores/app.js'
import {useUserStore} from '../../stores/user.js'

import Own from './Own.vue'
import AccessDenied from '../user/AccessDenied.vue'

// lifecycle hooks
onMounted(() => {
  console.log(`the component is now mounted.`)
  ticketStore.own()
})

const route = useRoute()

const ticketStore = useTicketStore()
const appStore = useAppStore()
const userStore = useUserStore()

// set corresponding menu item to active
appStore.setMenuItemActive(route.name)
</script>

<template>
  <div v-if="userStore.authenticated">
    <div class="uk-section">
      <div class="uk-container">
        <div v-if="ticketStore.loading">
          <div uk-spinner></div>
        </div>
        <div v-else>
          <Own />
        </div>
      </div>
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
