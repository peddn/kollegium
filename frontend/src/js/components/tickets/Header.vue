<script setup>
import {ref, computed, onMounted} from 'vue'

import {useTicketStore} from '../../stores/ticket.js'
import {useAppStore} from '../../stores/app'

const ticketStore = useTicketStore()
const appStore = useAppStore()

const props = defineProps({
  text: {
    type: String,
  },
  reloadFunction: {
    type: String,
  },
})

const limit = ref(0)

// lifecycle hooks
onMounted(() => {
  console.log('onMounted:Header.vue')
  limit.value = appStore.pagination.limit
})

const hasReloadFunction = computed(() => {
  return props.reloadFunction === undefined ? false : true
})

const reload = () => {
  if (typeof ticketStore[props.reloadFunction] === 'function') {
    ticketStore[props.reloadFunction]()
  }
}

const changeHandler = () => {
  appStore.pagination.limit = parseInt(limit.value)
  reload()
}

const isSelected = (limit) => {
  return limit === appStore.pagination.limit
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
      <div class="uk-navbar-right">
        <div class="uk-navbar-item" v-if="hasReloadFunction">
          <form>
            <select
              class="uk-select uk-form-small uk-form-width-small"
              v-model="limit"
              v-on:change="changeHandler"
            >
              <option value="5" v-bind:selected="isSelected(5)">5</option>
              <option value="10" v-bind:selected="isSelected(10)">10</option>
              <option value="15" v-bind:selected="isSelected(15)">15</option>
              <option value="20" v-bind:selected="isSelected(20)">20</option>
              <option value="25" v-bind:selected="isSelected(15)">25</option>
            </select>
          </form>
        </div>

        <div class="uk-navbar-item" v-if="hasReloadFunction">
          <a class="uk-icon-button" uk-icon="refresh" v-on:click="reload"></a>
        </div>
      </div>
    </div>
  </nav>
</template>
