<script setup>
import {onMounted} from 'vue'

import {useTicketStore} from '../../stores/ticket.js'
import {useUserStore} from '../../stores/user.js'

import AccessDenied from '../user/AccessDenied.vue'

const ticketStore = useTicketStore()
const userStore = useUserStore()

// lifecycle hooks
onMounted(() => {
  console.log(`Fetch own tickets and show /tickets/own`)
  ticketStore.assigned()
})
</script>

<template>
  <div v-if="userStore.authenticated">
    <div v-if="ticketStore.loading">
      <div uk-spinner></div>
    </div>
    <div v-else>assigned</div>
  </div>
  <div v-else>
    <AccessDenied />
  </div>
</template>
