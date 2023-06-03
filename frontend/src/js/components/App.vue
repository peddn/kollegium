<script setup>
import NavbarMain from '../components/navbar/Main.vue'
import LoginModal from '../components/user/LoginModal.vue'
import AppContainer from './generic/AppContainer.vue'
</script>

<template>
  <NavbarMain />
  <AppContainer>
    <router-view></router-view>
  </AppContainer>
  <div id="modals">
    <LoginModal />
  </div>
</template>
