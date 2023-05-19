<script setup>
import {useDashboardStore} from '../../stores/dashboard.js'
import Group from './Group.vue'
const dashboardStore = useDashboardStore()
</script>

<template>
  <h3>your groups:</h3>
  <div class="uk-child-width-1-5" uk-grid>
    <Group
      v-for="group in dashboardStore.groups"
      v-bind:key="group.id"
      v-bind:group="group"
    />
  </div>
</template>
