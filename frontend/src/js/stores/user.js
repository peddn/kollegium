import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useRouter} from 'vue-router'

import UIkit from 'uikit'

import {userLogin} from '../api/user.js'
import {NetworkError, HTTPError, ParsingError} from '../api/errors.js'
import {uiErrorNotification} from '../utils.js'

export const useUserStore = defineStore('user', () => {
  const user = ref({})
  const jwt = ref('')
  const authenticated = ref(false)
  // flag for the ui to mark the user data as edited
  const edited = ref(false)

  const router = useRouter()

  const $reset = () => {
    user.value = {}
    jwt.value = ''
    authenticated.value = false
  }

  const login = async (identifier, password) => {
    userLogin(identifier, password)
      .then((response) => {
        // store the user and token data
        user.value = response.user
        jwt.value = response.jwt
        // mark user as authenticated
        authenticated.value = true
        // initialize and hide the modal
        const loginModal = document.getElementById('login-modal')
        UIkit.modal(loginModal).hide()
        router.push('/dashboard')
      })
      .catch((error) => {
        switch (error.name) {
          case NetworkError.name:
            console.error('network error: ', error)
            uiErrorNotification(error)
            break
          case HTTPError.name:
            console.error('http error: ', error)
            error.message = 'Ungültiger Username oder falsches Passwort'
            uiErrorNotification(error)
            break
          case ParsingError.name:
            console.error('parsing error: ', error)
            uiErrorNotification(error)
            break
          default:
            console.error('unknown error: ', error)
            uiErrorNotification(error)
        }
        $reset()
      })
  }

  // simply reset the state
  const logout = () => {
    $reset()
    // show HOME view
    router.push('/')
  }

  return {user, jwt, authenticated, edited, login, logout}
})
