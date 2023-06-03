<script setup>
import {computed} from 'vue'

import {useTicketStore} from '../../stores/ticket.js'

const ticketStore = useTicketStore()

const props = defineProps({
  text: {
    type: String,
  },
  reloadFunction: {
    type: String,
  },
})

const hasReloadFunction = computed(() => {
  return props.reloadFunction === undefined ? false : true
})

const reload = () => {
  if (typeof ticketStore[props.reloadFunction] === 'function') {
    ticketStore[props.reloadFunction]()
  }
}
</script>

<template>
  <nav
    class="uk-padding-small uk-padding-remove-top uk-padding-remove-bottom uk-background-primary uk-margin-bottom"
  >
    <div uk-navbar>
      <div class="uk-navbar-left">
        <div class="uk-navbar-item uk-logo">{{ props.text }}</div>
      </div>
      <div class="uk-navbar-right" v-if="hasReloadFunction">
        <div class="uk-navbar-item">
          <a class="uk-icon-button" uk-icon="refresh" v-on:click="reload"></a>
        </div>
      </div>
    </div>
  </nav>
</template>
