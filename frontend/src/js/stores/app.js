import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useAppStore = defineStore('app', () => {
  const activeMenuItem = ref('home')

  const setMenuItemActive = (item) => {
    activeMenuItem.value = item
  }

  const isMenuItemActive = (item) => {
    return item === activeMenuItem.value
  }

  return {activeMenuItem, setMenuItemActive, isMenuItemActive}
})
