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

  // sorting parameters
  const sortFiled = ref('createdAt')
  const sortOrder = ref('asc')

  // IDEA: put this info in the user settings
  // TODO: put this in app store
  // pagination parameters
  const page = ref(1)
  const entitiesPerPage = ref(10)

  const $reset = () => {
    tickets.value = []
    loading.value = true
  }

  const handleError = (error) => {
    switch (error.name) {
      case NetworkError.name:
        console.log('network error')
        uiErrorNotification(error)
        break
      case HTTPError.name:
        console.log('http error')
        uiErrorNotification(error)
        break
      case ParsingError.name:
        console.log('parsing error')
        uiErrorNotification(error)
        break
      default:
        console.log('unknown error')
        uiErrorNotification(error)
    }
  }

  const ownReset = async () => {
    console.log('ticketStore', 'ownReset')
    $reset()
    ticketsOwn(userStore.jwt)
      .then((response) => {
        tickets.value = response
        loading.value = false
        uiNotification(
          'Meine Tickets erfolgreich geladen.',
          'success',
          'check',
          'bottom-right',
        )
        router.push('/tickets/own')
      })
      .catch(handleError)
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
        handleError(error)
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
      .catch(handleError)
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
      .catch(handleError)
  }

  const create = async (ticket) => {
    $reset()
    ticketsCreate(userStore.jwt, JSON.stringify(ticket))
      .then((response) => {
        console.log(response)
        loading.value = false
        uiNotification(
          'Neues Ticket erfolgreich erstellt.',
          'success',
          'check',
          'bottom-right',
        )
        router.push('/tickets/own')
      })
      .catch((error) => {
        handleError(error)
        loading.value = false
      })
  }

  // simply reset the state
  const reset = () => {
    $reset()
  }

  return {tickets, loading, ownReset, manage, open, assigned, create, reset}
})
