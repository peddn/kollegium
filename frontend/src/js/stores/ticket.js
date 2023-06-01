import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useRouter} from 'vue-router'

import {
  ticketsOwn,
  ticketsManage,
  ticketsOpen,
  ticketsAssigned,
  ticketsCreate,
} from '../api/ticket.js'
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
        router.push('/tickets/own')
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

  const manage = async () => {
    $reset()
    ticketsManage(userStore.jwt)
      .then((response) => {
        console.log(response)
        loading.value = false
        uiNotification('manage() called.', 'success', 'check', 'bottom-right')
        router.push('/tickets/manage')
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

  const open = async () => {
    $reset()
    ticketsOpen(userStore.jwt)
      .then((response) => {
        console.log(response)
        loading.value = false
        uiNotification('open() called.', 'success', 'check', 'bottom-right')
        router.push('/tickets/open')
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

  const assigned = async () => {
    $reset()
    ticketsAssigned(userStore.jwt)
      .then((response) => {
        console.log(response)
        loading.value = false
        uiNotification('assigned() called.', 'success', 'check', 'bottom-right')
        router.push('/tickets/assigned')
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

  const create = async () => {
    $reset()

    // test data
    const data = {
      data: {
        priority: 'low',
        subject: 'test-data',
        description: 'test-data',
        category: 'software',
      },
    }
    ticketsCreate(userStore.jwt, JSON.stringify(data))
      .then((response) => {
        console.log(response)
        loading.value = false
        uiNotification('create() called.', 'success', 'check', 'bottom-right')
        router.push('/tickets/own')
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

  return {tickets, loading, own, manage, open, assigned, create, reset}
})
