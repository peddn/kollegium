<script setup>
  import { ref } from 'vue'

  import { useUserStore } from '../../stores/user.js'

  import UIkit from 'uikit'

  const userStore = useUserStore()

  const identifier = ref('')
  const password = ref('')

  const login = (event) => {
    try {
      userStore.login(identifier.value, password.value)
      resetForm()
    } catch (error) {
      UIkit.notification({ message: error.name, status: 'danger' })
    }
  }

  const resetForm = (event) => {
    identifier.value = ''
    password.value = ''
    document.getElementById('login-modal-form').reset()
  }
</script>

<template>
  <div id="login-modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <button
        class="uk-modal-close-default"
        type="button"
        uk-close
        v-on:click="resetForm"
      ></button>

      <div class="uk-modal-header">
        <h2 class="uk-modal-title">login</h2>
      </div>
      <div class="uk-modal-body">
        <form class="uk-form-horizontal" id="login-modal-form">
          <div class="uk-margin uk-text-right">
            <label class="uk-form-label" for="form-horizontal-text"
              >e-mail / username</label
            >
            <div class="uk-form-controls">
              <div class="uk-inline">
                <span
                  class="uk-form-icon uk-form-icon-flip"
                  uk-icon="icon: user"
                ></span>
                <input
                  class="uk-input"
                  type="text"
                  aria-label="Not clickable icon"
                  v-model="identifier"
                />
              </div>
            </div>
          </div>
          <div class="uk-margin uk-text-right">
            <label class="uk-form-label" for="form-horizontal-text"
              >Password</label
            >
            <div class="uk-form-controls">
              <div class="uk-inline">
                <span
                  class="uk-form-icon uk-form-icon-flip"
                  uk-icon="icon: lock"
                ></span>
                <input
                  class="uk-input"
                  type="password"
                  aria-label="Not clickable icon"
                  v-model="password"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="uk-modal-footer uk-text-right">
        <button
          class="uk-button uk-button-default uk-modal-close"
          type="button"
          v-on:click="resetForm"
        >
          Cancel
        </button>
        <button
          class="uk-button uk-button-primary"
          type="button"
          v-on:click="login"
        >
          login
        </button>
      </div>
    </div>
  </div>
</template>
