<script setup>
defineProps(['style', 'message'])
</script>

<template>
  <span v-if="style === 'success'" class="uk-label uk-label-success">{{
    message
  }}</span>
  <span v-else-if="style === 'warning'" class="uk-label uk-label-warning">{{
    message
  }}</span>
  <span v-else-if="style === 'danger'" class="uk-label uk-label-danger">{{
    message
  }}</span>
  <span v-else class="uk-label">{{ message }}</span>
</template>
