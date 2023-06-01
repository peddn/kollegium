<script setup>
import NavbarMain from '../components/navbar/Main.vue'
import LoginModal from '../components/user/LoginModal.vue'
</script>

<template>
  <NavbarMain />
  <div class="uk-section-small">
    <div class="uk-container">
      <router-view></router-view>
    </div>
  </div>
  <div id="modals">
    <LoginModal />
  </div>
</template>
