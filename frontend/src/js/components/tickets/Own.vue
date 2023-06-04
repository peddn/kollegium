<script setup>
import {onMounted} from 'vue'

import {useTicketStore} from '../../stores/ticket.js'
import {useUserStore} from '../../stores/user.js'

const ticketStore = useTicketStore()
const userStore = useUserStore()

import Header from './Header.vue'
import AccessDenied from '../user/AccessDenied.vue'
import Spinner from '../generic/Spinner.vue'
import Label from '../generic/Label.vue'

const API_URL = process.env.API_URL

// lifecycle hooks
onMounted(() => {
  console.log('onMounted:Own.vue')
  ticketStore.ownReset()
})

// Methods
const avatarURL = (ticket) => {
  const url = ticket.supporter.avatar.url
  return API_URL + url
}

const avatarTooltip = (ticket) => {
  const username = ticket.supporter.username
  const email = ticket.supporter.email
  return username + ' | ' + email
}

const getDate = (ticket, locale) => {
  return new Date(ticket.createdAt).toLocaleDateString(locale)
}

const getTime = (ticket, locale) => {
  return new Date(ticket.createdAt).toLocaleTimeString(locale)
}
</script>

<template>
  <div v-if="userStore.authenticated">
    <div v-if="ticketStore.loading">
      <Header text="Meine Tickets" reloadFunction="ownReset" />
      <div
        class="uk-container uk-flex uk-flex-center uk-flex-middle app-min-height"
      >
        <Spinner ratio="2" />
      </div>
    </div>
    <div v-else>
      <Header text="Meine Tickets" reloadFunction="ownReset" />
      <table class="uk-table uk-table-divider uk-table-hover uk-table-middle">
        <thead>
          <tr>
            <th class="uk-table-shrink uk-text-nowrap">Status</th>
            <th class="uk-table-shrink uk-text-nowrap uk-text-center">
              erstellt am
            </th>
            <th class="uk-table-shrink uk-text-nowrap uk-text-center">
              Supporter
            </th>
            <th class="uk-table-shrink uk-text-nowrap">Kategorie</th>
            <th class="uk-table-expand uk-text-nowrap">Betreff</th>
            <th class="uk-width-1-4">Beschreibung</th>
            <th class="uk-table-shrink uk-text-nowrap uk-text-center">
              Lösung
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in ticketStore.tickets">
            <td>
              <Label
                v-bind:modifier="ticket.status"
                v-bind:message="ticket.status"
                class="uk-width-expand uk-text-center"
              />
            </td>
            <td class="uk-text-center">
              {{ getDate(ticket, 'de-DE') }}<br />
              {{ getTime(ticket, 'de-DE') }}<br />
            </td>
            <td v-if="ticket.supporter" class="uk-text-center">
              <img
                class="uk-border-circle"
                width="48"
                height="48"
                v-bind:src="avatarURL(ticket)"
                v-bind:alt="avatarTooltip(ticket)"
                v-bind:uk-tooltip="avatarTooltip(ticket)"
              />
            </td>
            <td v-else class="uk-text-center">nicht zugewiesen</td>
            <td>
              <Label
                v-bind:modifier="ticket.category"
                v-bind:message="ticket.category"
                class="uk-width-expand uk-text-center"
              />
            </td>
            <td>{{ ticket.subject }}</td>
            <td class="uk-text-truncate">{{ ticket.description }}</td>
            <td class="uk-text-center">
              <button class="uk-button uk-button-default uk-button-small">
                anzeigen
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <AccessDenied />
  </div>
</template>
