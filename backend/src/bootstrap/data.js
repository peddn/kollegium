// bootstrap/data.js
'use strict'

const priorities = ['high', 'medium', 'low']
const categories = [
  'hardware',
  'software',
  'network',
  'cloud',
  'internet',
  'mobile',
]
const problems = [
  'Probleme beim Drucken',
  'Bluescreen-Fehler',
  'Langsamer Netzwerkzugriff',
  'Passwort zurücksetzen',
  'Fehlerhafte Softwareinstallation',
  'Verbindungsprobleme mit dem WLAN',
  'Datenverlust auf der Festplatte',
  'Probleme mit dem E-Mail-Zugriff',
  'Serverausfall',
  'Mobiles Gerät startet nicht',
]

// Array of roles that need to be created.
const roles = ['Teacher', 'Supporter', 'Principal']

module.exports = {
  priorities,
  categories,
  problems,
  roles,
}
