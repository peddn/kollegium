<script setup>
import {useRoute} from 'vue-router'

import {useAppStore} from '../../stores/app.js'
import {useUserStore} from '../../stores/user.js'

import AccessDenied from '../user/AccessDenied.vue'

const route = useRoute()

const appStore = useAppStore()
const userStore = useUserStore()

// set corresponding menu item to active
appStore.setMenuItemActive(route.name)
</script>

<template>
  <div v-if="userStore.authenticated">
    <div class="uk-section">
      <div class="uk-container">
        <div class="uk-child-width-expand" uk-grid>
          <div>
            <div class="uk-card uk-card-default uk-card-body">
              <h3 class="uk-card-title">Ihre Tickets:</h3>
              <div class="uk-overflow-auto">
                <table
                  class="uk-table uk-table-hover uk-table-middle uk-table-divider"
                >
                  <thead>
                    <tr>
                      <th class="uk-table-shrink">Erstellt am</th>
                      <th class="uk-table-shrink">Status</th>
                      <th class="uk-table-shrink">Priorität</th>
                      <th class="uk-table-expand">Betreff</th>
                      <th class="uk-table-expand">Beschreibung</th>
                      <th class="uk-table-shrink">Kategorie</th>
                      <th class="uk-table-shrink">Bearbeiter</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>16.05.2023</td>
                      <td class="uk-text-center">
                        <span class="uk-label">offen</span>
                      </td>
                      <td>Lorem ipsum dolor sit amet, consectetur</td>
                      <td class="uk-text-center">
                        <img
                          width="40"
                          height="40"
                          src="https://ui-avatars.com/api/?background=0D8ABC&color=fff"
                          alt="Avatar"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="uk-card uk-card-default uk-card-body">
            <h3 class="uk-card-title">Ein neues Ticket erstellen:</h3>
            <form class="uk-form-stacked">
              <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text"
                  >Text</label
                >
                <div class="uk-form-controls">
                  <input
                    class="uk-input"
                    id="form-stacked-text"
                    type="text"
                    placeholder="Some text..."
                  />
                </div>
              </div>

              <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-select"
                  >Select</label
                >
                <div class="uk-form-controls">
                  <div uk-form-custom="target: > * > span:first-child">
                    <select aria-label="Custom controls">
                      <option value="">Please select...</option>
                      <option value="1">Option 01</option>
                      <option value="2">Option 02</option>
                      <option value="3">Option 03</option>
                      <option value="4">Option 04</option>
                    </select>
                    <button
                      class="uk-button uk-button-default"
                      type="button"
                      tabindex="-1"
                    >
                      <span></span>
                      <span uk-icon="icon: chevron-down"></span>
                    </button>
                  </div>
                </div>
              </div>

              <div class="uk-margin">
                <div class="uk-form-label">Radio</div>
                <div class="uk-form-controls">
                  <textarea
                    class="uk-textarea"
                    rows="5"
                    placeholder="Textarea"
                    aria-label="Textarea"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="uk-section">
      <div class="uk-container">
        <AccessDenied />
      </div>
    </div>
  </div>
</template>
