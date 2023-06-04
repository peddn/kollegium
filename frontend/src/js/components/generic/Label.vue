<script setup>
import {ref, computed} from 'vue'

const props = defineProps(['modifier', 'message', 'icon'])

const labelClass = ref('uk-label')
const modifierClass = ref(`uk-label-${props.modifier}`)
</script>

<template>
  <span v-bind:class="[labelClass, modifierClass]" v-if="props.modifier">{{
    message
  }}</span>
  <span v-bind:class="[labelClass]" v-else>{{ message }}</span>
</template>
