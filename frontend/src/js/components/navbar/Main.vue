<script setup>
  import { useAppStore } from '../../stores/app.js'
  import { useUserStore } from '../../stores/user.js'

  import ItemUser from '../navbar/ItemUser.vue'

  const appStore = useAppStore()
  const userStore = useUserStore()
</script>

<template>
  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left">
      <ul class="uk-navbar-nav uk-margin-left" v-if="userStore.authenticated">
        <li v-bind:class="{ 'uk-active': appStore.isMenuItemActive('home') }">
          <router-link to="/">Home</router-link>
        </li>
        <li
          v-bind:class="{ 'uk-active': appStore.isMenuItemActive('dashboard') }"
        >
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
      </ul>
      <ul class="uk-navbar-nav uk-margin-left" v-else>
        <li v-bind:class="{ 'uk-active': appStore.isMenuItemActive('home') }">
          <router-link to="/">Home</router-link>
        </li>
      </ul>
    </div>
    <div class="uk-navbar-right">
      <ItemUser />
    </div>
  </nav>
</template>
