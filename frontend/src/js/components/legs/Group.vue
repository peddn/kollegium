<script setup>
const props = defineProps({
  group: Object,
})
</script>

<template>
  <div>
    <button class="uk-button uk-button-primary uk-button-large uk-width-1-1">
      <span uk-icon="users"></span> {{ group.name }}
    </button>
  </div>
</template>
