import '../scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'

import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

import App from './components/App.vue'
import Home from './components/Home.vue'
import Dashboard from './components/Dashboard.vue'
import Account from './components/user/Account.vue'

const pinia = createPinia()

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
  },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

// loads the Icon plugin
UIkit.use(Icons)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
