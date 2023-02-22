<script setup>
  import { useUserStore } from '../../stores/user.js'

  const userStore = useUserStore()

  const logout = (event) => {
    userStore.logout()
  }
</script>

<template>
  <div class="uk-navbar-item" v-if="userStore.authenticated">
    <router-link
      to="/account"
      class="uk-button uk-button-default uk-margin-small-right"
      type="button"
      >account</router-link
    >
    <button
      class="uk-button uk-button-default uk-margin-small-right"
      type="button"
      v-on:click="logout"
    >
      logout
    </button>
  </div>
  <div class="uk-navbar-item" v-else>
    <button
      class="uk-button uk-button-default uk-margin-small-right"
      type="button"
      uk-toggle="target: #login-modal"
    >
      login
    </button>
  </div>
</template>
