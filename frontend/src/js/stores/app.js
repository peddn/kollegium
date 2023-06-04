import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const useAppStore = defineStore('app', () => {
  const activeMenuItem = ref('home')
  // TODO IDEA: put this info in the user settings
  // pagination parameters
  const pagination = ref({
    start: 0,
    limit: 15,
    count: undefined,
  })

  const setMenuItemActive = (item) => {
    activeMenuItem.value = item
  }

  const isMenuItemActive = (item) => {
    return item === activeMenuItem.value
  }

  const setPagination = (newPagination) => {
    pagination.value = newPagination
  }

  const page = computed(() => {
    return pagination.value.start / pagination.value.limit
  })

  const pageCount = computed(() => {
    if (pagination.value.count !== undefined) {
      return Math.ceil(pagination.value.count / pagination.value.limit)
    }
    return pagination.value.count
  })

  return {
    activeMenuItem,
    setMenuItemActive,
    isMenuItemActive,
    pagination,
    setPagination,
    page,
    pageCount,
  }
})
