<script setup>
import {ref, onMounted} from 'vue'

import {useRouter} from 'vue-router'

import {useTicketStore} from '../../stores/ticket.js'
import {useUserStore} from '../../stores/user.js'

import Header from './Header.vue'
import AccessDenied from '../user/AccessDenied.vue'
import Spinner from '../generic/Spinner.vue'

const ticketStore = useTicketStore()
const userStore = useUserStore()

const router = useRouter()

// lifecycle hooks
onMounted(() => {
  console.log(`onMounted:Create.vue`)
  ticketStore.loading = false
})

const priority = ref('medium')
const subject = ref('')
const description = ref('')
const category = ref('')

const create = (event) => {
  console.log('create')
  // test data
  ticketStore.create({
    data: {
      priority: priority.value,
      subject: subject.value,
      description: description.value,
      category: category.value,
    },
  })
}

const reset = () => {
  priority.value = 'medium'
  subject.value = ''
  description.value = ''
  category.value = ''
}

const cancel = () => {
  reset()

  router.push('/tickets/own')
}
</script>

<template>
  <div v-if="userStore.authenticated">
    <div v-if="ticketStore.loading">
      <Header text="Ein Problem Melden:" />
      <div
        class="uk-container uk-flex uk-flex-center uk-flex-middle app-min-height"
      >
        <Spinner ratio="2" />
      </div>
    </div>
    <div v-else>
      <Header text="Ein Problem Melden:" />
      <div class="uk-flex uk-flex-center">
        <div class="uk-width-1-3">
          <form class="uk-form-stacked">
            <div class="uk-margin">
              <label class="uk-form-label" for="form-priority"
                >Priorität:</label
              >
              <div class="uk-form-controls">
                <select class="uk-select" id="form-priority" v-model="priority">
                  <option value="high">hoch</option>
                  <option value="medium" selected>mittel</option>
                  <option value="low">niedrig</option>
                </select>
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-category"
                >Kategorie:</label
              >
              <div class="uk-form-controls">
                <select class="uk-select" id="form-category" v-model="category">
                  <option value="hardware">Hardware</option>
                  <option value="software">Software</option>
                  <option value="network">Netzwerk</option>
                  <option value="internet">Internet</option>
                  <option value="cloud">Cloud</option>
                  <option value="mobile">Mobile Geräte</option>
                </select>
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-subject">Betreff:</label>
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="form-subject"
                  type="text"
                  placeholder="Kurze Beschreibung des Problems..."
                  v-model="subject"
                />
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-description"
                >Beschreibung:</label
              >
              <div class="uk-form-controls">
                <textarea
                  class="uk-textarea"
                  id="form-description"
                  rows="3"
                  placeholder="Eine ausführliche Beschreibung des Problems (optional)..."
                  aria-label="Textarea"
                  v-model="description"
                ></textarea>
              </div>
            </div>
          </form>
          <div class="uk-flex uk-flex-center">
            <button
              class="uk-button uk-button-default uk-button-small"
              v-on:click="cancel"
            >
              abbrechen
            </button>
            <button
              class="uk-button uk-button-default uk-button-small uk-margin-left uk-margin-right"
              v-on:click="reset"
            >
              zurücksetzen
            </button>
            <button
              class="uk-button uk-button-primary uk-button-small"
              v-on:click="create"
            >
              anlegen
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <AccessDenied />
  </div>
</template>
