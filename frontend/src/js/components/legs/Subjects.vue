<script setup>
import {useDashboardStore} from '../../stores/dashboard.js'
import Subject from './Subject.vue'
const dashboardStore = useDashboardStore()
</script>

<template>
  <h3>your subjects:</h3>
  <div class="uk-child-width-1-5" uk-grid>
    <Subject
      v-for="subject in dashboardStore.subjects"
      v-bind:key="subject.id"
      v-bind:subject="subject"
    />
  </div>
</template>
