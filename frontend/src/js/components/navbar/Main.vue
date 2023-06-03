<script setup>
import {useAppStore} from '../../stores/app.js'
import {useUserStore} from '../../stores/user.js'

import ItemUser from '../navbar/ItemUser.vue'

const appStore = useAppStore()
const userStore = useUserStore()
</script>

<template>
  <nav class="uk-navbar-container">
    <div class="uk-container">
      <div uk-navbar>
        <div class="uk-navbar-left">
          <ul class="uk-navbar-nav" v-if="userStore.authenticated">
            <li v-bind:class="{'uk-active': appStore.isMenuItemActive('home')}">
              <router-link to="/">Home</router-link>
            </li>
            <li
              v-bind:class="{
                'uk-active': appStore.isMenuItemActive('dashboard'),
              }"
            >
              <router-link to="/dashboard">Dashboard</router-link>
            </li>
            <!--             <li
              v-bind:class="{
                'uk-active': appStore.isMenuItemActive('tickets'),
              }"
            >
              <router-link to="/tickets">tickets</router-link>
            </li> -->

            <li>
              <a href="#">Tickets</a>
              <div class="uk-navbar-dropdown">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li
                    v-bind:class="{
                      'uk-active': appStore.isMenuItemActive('ticketsOwn'),
                    }"
                  >
                    <router-link to="/tickets/own">meine Tickets</router-link>
                  </li>
                  <li
                    v-bind:class="{
                      'uk-active': appStore.isMenuItemActive('ticketsCreate'),
                    }"
                  >
                    <router-link to="/tickets/create">neues Ticket</router-link>
                  </li>
                  <li class="uk-nav-divider"></li>
                  <li
                    v-bind:class="{
                      'uk-active': appStore.isMenuItemActive('ticketsAssigned'),
                    }"
                  >
                    <router-link to="/tickets/assigned"
                      >zugewiesene Tickets</router-link
                    >
                  </li>
                  <li class="uk-nav-divider"></li>
                  <li
                    v-bind:class="{
                      'uk-active': appStore.isMenuItemActive('ticketsOpen'),
                    }"
                  >
                    <router-link to="/tickets/open">offene Tickets</router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <ul class="uk-navbar-nav" v-else>
            <li v-bind:class="{'uk-active': appStore.isMenuItemActive('home')}">
              <router-link to="/">Home</router-link>
            </li>
          </ul>
        </div>
        <div class="uk-navbar-right">
          <ItemUser />
        </div>
      </div>
    </div>
  </nav>
</template>
