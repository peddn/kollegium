<script setup>
import {onMounted} from 'vue'

import {useTicketStore} from '../../stores/ticket.js'
import {useUserStore} from '../../stores/user.js'

const ticketStore = useTicketStore()
const userStore = useUserStore()

import StatusLabel from './StatusLabel.vue'
import AccessDenied from '../user/AccessDenied.vue'

const API_URL = process.env.API_URL

// lifecycle hooks
onMounted(() => {
  console.log(`Fetch the data and show the view.`)
  ticketStore.own()
})

// Methods
const avatarURL = (ticket) => {
  const url = ticket.history[0].supporter.avatar.url
  return API_URL + url
}

const avatarTooltip = (ticket) => {
  const username = ticket.history[0].supporter.username
  const email = ticket.history[0].supporter.email
  return username + ' | ' + email
}

const getDate = (ticket, locale) => {
  return new Date(ticket.createdAt).toLocaleDateString(locale)
}

const getTime = (ticket, locale) => {
  return new Date(ticket.createdAt).toLocaleTimeString(locale)
}

const getDateDifference = (ticket) => {
  const now = new Date()
  const createdAt = new Date(ticket.createdAt)
  return now.getDate() - createdAt.getDate()
}
</script>

<template>
  <div v-if="userStore.authenticated">
    <div v-if="ticketStore.loading">
      <div uk-spinner></div>
    </div>
    <div v-else>
      <table class="uk-table uk-table-divider uk-table-hover uk-table-middle">
        <caption>
          Ihre Tikets
        </caption>
        <thead>
          <tr>
            <th class="uk-table-shrink uk-text-nowrap">Status</th>
            <th class="uk-table-shrink uk-text-nowrap">erstellt am</th>
            <th class="uk-table-shrink uk-text-nowrap">Supporter</th>
            <th class="uk-table-shrink uk-text-nowrap">Kategorie</th>
            <th class="uk-table-expand uk-text-nowrap">Betreff</th>
            <th class="uk-width-1-4">Beschreibung / Lösung</th>
            <th class="uk-table-shrink uk-text-nowrap">externe ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in ticketStore.tickets">
            <td><StatusLabel v-bind:status="ticket.status" /></td>
            <td>
              {{ getDate(ticket, 'de-DE') }}<br />
              {{ getTime(ticket, 'de-DE') }}<br />
              <p v-if="getDateDifference(ticket) === 1">vor einem Tag</p>
              <p v-if="getDateDifference(ticket) > 1">
                vor {{ getDateDifference }} Tagen
              </p>
            </td>
            <td v-if="ticket.history.length > 0">
              <img
                class="uk-border-circle"
                width="64"
                height="64"
                v-bind:src="avatarURL(ticket)"
                v-bind:alt="avatarTooltip(ticket)"
                v-bind:uk-tooltip="avatarTooltip(ticket)"
              />
            </td>
            <td v-else>nicht zugewiesen</td>
            <td>{{ ticket.category }}</td>
            <td>{{ ticket.subject }}</td>
            <td v-if="ticket.solution !== null" class="uk-text-truncate">
              {{ ticket.solution }}
            </td>
            <td v-else class="uk-text-truncate">{{ ticket.description }}</td>
            <td>{{ ticket.externalID }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else>
    <AccessDenied />
  </div>
</template>
