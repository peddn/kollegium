// index.js
'use strict'

const {createDemoTickets, createStandardRoles} = require('./bootstrap/create')

module.exports = {
  async bootstrap({strapi}) {
    strapi.log.info('Bootstrapping application...')
    await createStandardRoles({strapi})
    if (
      process.env.CREATE_DEMO_TICKETS &&
      process.env.CREATE_DEMO_TICKETS.toLowerCase() === 'true'
    ) {
      await createDemoTickets({strapi})
    }
    strapi.log.info('Bootstrapping process has been successfully completed.')
  },
}
