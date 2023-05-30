import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useRouter} from 'vue-router'

import {ticketsOwn} from '../api/ticket.js'
import {NetworkError, HTTPError, ParsingError} from '../api/errors.js'

import {uiNotification} from '../utils.js'
import {uiErrorNotification} from '../utils.js'

import {useUserStore} from './user.js'

export const useTicketStore = defineStore('ticket', () => {
  const router = useRouter()

  const userStore = useUserStore()

  const tickets = ref([])
  const loading = ref(true)

  const $reset = () => {
    tickets.value = []
    loading.value = true
  }

  const own = async () => {
    $reset()
    ticketsOwn(userStore.jwt)
      .then((response) => {
        tickets.value = response
        console.log(tickets.value)
        loading.value = false
        uiNotification(
          'Tickets erfolgreich geladen.',
          'success',
          'check',
          'bottom-right',
        )
        router.push('/tickets')
      })
      .catch((error) => {
        switch (error.name) {
          case NetworkError.name:
            console.error('network error: ', error)
            uiErrorNotification(error)
            break
          case HTTPError.name:
            console.error('http error: ', error)
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
      })
  }

  // simply reset the state
  const reset = () => {
    $reset()
  }

  return {tickets, loading, own, reset}
})
