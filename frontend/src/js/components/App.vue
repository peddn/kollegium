<script setup>
import NavbarMain from '../components/navbar/Main.vue'
import LoginModal from '../components/user/LoginModal.vue'
</script>

<template>
  <NavbarMain />
  <router-view></router-view>
  <div id="modals">
    <LoginModal />
  </div>
</template>
