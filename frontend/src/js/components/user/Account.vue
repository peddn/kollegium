<script setup>
  import { useRoute } from 'vue-router'

  import { useAppStore } from '../../stores/app.js'
  import { useUserStore } from '../../stores/user.js'

  import AccessDenied from './AccessDenied.vue'

  const userStore = useUserStore()
  const appStore = useAppStore()

  // set corresponding menu item to active
  const route = useRoute()
  appStore.setMenuItemActive(route.name)
</script>

<template>
  <div v-if="userStore.authenticated">
    <div class="uk-section">
      <div class="uk-container uk-container-xsmall">
        <h2>Account</h2>

        <form class="uk-form-horizontal">
          <div class="uk-margin">
            <label class="uk-form-label" for="account-form-username"
              >username</label
            >
            <div class="uk-form-controls">
              <input
                class="uk-input"
                id="account-form-username"
                type="text"
                placeholder="your username"
                v-bind:value="userStore.user.username"
              />
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label" for="account-form-email">email</label>
            <div class="uk-form-controls">
              <input
                class="uk-input"
                id="account-form-email"
                type="text"
                placeholder="your email address"
                v-model="userStore.user.email"
              />
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label" for="account-form-confirmed"
              >confirmed</label
            >
            <div class="uk-form-controls">
              <input
                class="uk-checkbox"
                id="account-form-confirmed"
                type="checkbox"
                v-model="userStore.user.confirmed"
              />
            </div>
          </div>

          <div class="uk-margin">
            <label class="uk-form-label" for="account-form-blocked"
              >blocked</label
            >
            <div class="uk-form-controls">
              <input
                class="uk-checkbox"
                id="account-form-blocked"
                type="checkbox"
                v-model="userStore.user.blocked"
              />
            </div>
          </div>
        </form>

        <div class="uk-grid-match uk-child-width-1-2" uk-grid>
          <div>
            <p></p>
          </div>
          <div>
            <p></p>
          </div>
        </div>
      </div>
    </div>

    <h1></h1>
    <div class="uk-section">
      <div class="uk-container"></div>
    </div>
  </div>
  <div v-else>
    <AccessDenied />
  </div>
</template>
