<script setup>
  import NavbarMain from '../components/navbar/Main.vue'
  import LoginModal from '../components/user/LoginModal.vue'
</script>

<template>
  <NavbarMain />

  <div>
    <router-view></router-view>
  </div>

  <div id="modals">
    <LoginModal />
  </div>
</template>
