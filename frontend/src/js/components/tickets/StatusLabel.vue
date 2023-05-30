<script setup>
defineProps(['status'])
</script>

<template>
  <span v-if="status === 'open'" class="uk-label uk-label-danger">{{
    status
  }}</span>
  <span v-else-if="status === 'inprogress'" class="uk-label">{{ status }}</span>
  <span v-else-if="status === 'pending'" class="uk-label uk-label-warning">{{
    status
  }}</span>
  <span v-else-if="status === 'resolved'" class="uk-label uk-label-success">{{
    status
  }}</span>
  <span v-else-if="status === 'closed'" class="uk-label">{{ status }}</span>
</template>
