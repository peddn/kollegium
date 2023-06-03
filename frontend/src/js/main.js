import '../scss/main.scss'

import {createApp, markRaw} from 'vue'
import {createPinia} from 'pinia'
import {createRouter, createWebHashHistory} from 'vue-router'

import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

import App from './components/App.vue'
import Home from './components/home/Home.vue'
import Dashboard from './components/dashboard/Dashboard.vue'
import TicketsOwn from './components/tickets/Own.vue'
import TicketsCreate from './components/tickets/Create.vue'
import TicketsAssigend from './components/tickets/Assigned.vue'
import TicketsOpen from './components/tickets/Open.vue'
import Account from './components/user/Account.vue'

// inject axios in evers store
// https://pinia.vuejs.org/core-concepts/plugins.html#adding-new-external-properties
const pinia = createPinia()

// ROUTES
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
    path: '/tickets/own',
    name: 'ticketsOwn',
    component: TicketsOwn,
  },
  {
    path: '/tickets/create',
    name: 'ticketsCreate',
    component: TicketsCreate,
  },
  {
    path: '/tickets/assigned',
    name: 'ticketsAssigned',
    component: TicketsAssigend,
  },
  {
    path: '/tickets/open',
    name: 'ticketsOpen',
    component: TicketsOpen,
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
