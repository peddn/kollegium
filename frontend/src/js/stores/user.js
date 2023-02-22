import { defineStore } from 'pinia'
import { ref } from 'vue'

import UIkit from 'uikit'

export const useUserStore = defineStore('user', () => {
  const user = ref({})
  const jwt = ref('')
  const authenticated = ref(false)

  const $reset = () => {
    user.value = {}
    jwt.value = ''
    authenticated.value = false
  }

  // TODO: store somwhere else... '.env' is not working in browser :(
  const BASE_URL = 'http://localhost:1337'

  const login = async (identifier, password) => {
    const url = BASE_URL + '/api/auth/local'
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: identifier,
          password: password,
        }),
      }).then((response) => {
        return response.json()
      })

      // get login module dom element
      const loginModal = document.getElementById('login-modal')

      // if request was ok, but login failed
      if (response.data === null && response.error !== null) {
        // check if there are mutiple errors
        if ('errors' in response.error.details) {
          // show all of them
          for (const error of response.error.details.errors) {
            UIkit.notification(
              '<span uk-icon="icon: check"></span> ' +
                error.name +
                '<br><p>' +
                error.message +
                '</p>'
            )
          }
          // show the single error
        } else {
          UIkit.notification(
            '<span uk-icon="icon: check"></span> ' +
              response.error.name +
              '<br><p>' +
              response.error.message +
              '</p>'
          )
        }
        document.getElementById('login-modal-form').reset()
        //UIkit.modal(loginModal).hide()
      } else {
        // store the user and token data
        user.value = response.user
        jwt.value = response.jwt
        // mark user as authenticated
        authenticated.value = true
        // reset the form
        // initialize and hide the modal
        UIkit.modal(loginModal).hide()
      }
      // if request was not ok
    } catch (error) {
      UIkit.notification(
        '<span uk-icon="icon: check"></span> ' +
          error.name +
          '<br><p>' +
          error.message +
          '</p>'
      )
      // reset the state
      $reset()
    }
  }

  // simply reset the state
  const logout = () => {
    $reset()
  }

  return { user, jwt, authenticated, login, logout }
})
