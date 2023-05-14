<script setup>
  const props = defineProps({
    subject: Object,
  })
</script>

<template>
  <div>
    <button class="uk-button uk-button-primary uk-button-large uk-width-1-1">
      <span uk-icon="folder"></span> {{ subject.name }}
    </button>
  </div>
</template>
