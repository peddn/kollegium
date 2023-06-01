<script setup>
import {computed} from 'vue'

const props = defineProps({
  ratio: {
    type: String,
    default: '1',
  },
})

const ratio = computed(() => {
  return 'ratio: ' + props.ratio
})
</script>

<template>
  <div v-bind:uk-spinner="ratio"></div>
</template>
