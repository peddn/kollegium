import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useUserStore } from './user.js'

import { uiErrorNotification } from '../utils.js'

export const useDashboardStore = defineStore('dashboard', () => {
  // get the user store
  const userStore = useUserStore()

  const groups = ref([])
  const subjects = ref([])

  const $reset = () => {
    groups.value = []
    subjects.value = []
  }

  const checkResponseErrors = (response) => {
    // if request was ok, but login failed
    if (response.data === null && response.error !== null) {
      // check if there are mutiple errors
      if ('errors' in response.error.details) {
        // show all of them
        for (const error of response.error.details.errors) {
          uiErrorNotification(error)
        }
        return false
        // show the single error
      } else {
        uiErrorNotification(error)
        return false
      }
    } else {
      return response
    }
  }

  const getGroups = async () => {
    console.log(axios.defaults.headers.common['Authorization'])
    console.log(axios.baseURL)
    try {
      let response = await axios.get('/api/groups/own')
      // check response for errors and handle those
      response = checkResponseErrors(response)
      // if there is a response
      if (response) {
        // store the data
        groups.value = response.data
      }
    } catch (error) {
      //console.error(error)
      uiErrorNotification(error)
      // reset the state
      $reset()
    }
  }

  const getSubjects = async () => {
    try {
      let response = await axios.get('/api/subjects/own')
      // check response for errors and handle those
      response = checkResponseErrors(response)
      // if there is a response
      if (response) {
        // store the data
        subjects.value = response.data
      }
    } catch (error) {
      //console.error(error)
      uiErrorNotification(error)
      // reset the state
      $reset()
    }
  }

  return { groups, subjects, getGroups, getSubjects }
})
