// bootstrap/create.js
'use strict'

const {priorities, categories, problems, roles} = require('./data')

function generateRandomTicket() {
  const randomPriority =
    priorities[Math.floor(Math.random() * priorities.length)]
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)]
  const randomProblem = problems[Math.floor(Math.random() * problems.length)]

  const ticket = {
    data: {
      status: 'open',
      priority: randomPriority,
      outsourced: false,
      creator: {
        disconnect: [],
        connect: [{id: 1}],
      },
      subject: '[DEMO-TICKET] ' + randomProblem,
      externalID: null,
      category: randomCategory,
    },
  }

  return ticket
}

async function createStandardRoles({strapi}) {
  strapi.log.info('Initiating role creation process...')
  for (const role of roles) {
    let exists = await strapi.entityService.findMany(
      'plugin::users-permissions.role',
      {
        filters: {
          name: role,
        },
      },
    )
    if (!Boolean(exists.length)) {
      exists = await strapi.entityService.create(
        'plugin::users-permissions.role',
        {
          data: {
            name: role,
            description: `This role is for ${role}s`,
            type: role.toLowerCase(),
          },
        },
      )
      strapi.log.info(`Role [${role}] has been successfully created.`)
    } else {
      strapi.log.info(`Role [${role}] already exists. No action required.`)
    }
  }
}

async function createDemoTickets({strapi}) {
  strapi.log.info('Initiating demo ticket creation process...')

  const entries = await strapi.entityService.findMany('api::ticket.ticket', {
    filters: {
      subject: {
        $startsWith: '[DEMO-TICKET]',
      },
    },
  })

  const existing = entries.length
  strapi.log.info(`There are currently ${existing} demo tickets.`)

  const demoTicketCount = parseInt(process.env.DEMO_TICKETS_COUNT)
  if (existing < demoTicketCount) {
    for (let i = demoTicketCount; i > existing; i--) {
      strapi.log.info(
        `Creating missing demo ticket number ${demoTicketCount + 1 - i}...`,
      )
      const entry = await strapi.entityService.create(
        'api::ticket.ticket',
        generateRandomTicket(),
      )
    }
  }
}

module.exports = {
  createStandardRoles,
  createDemoTickets,
}
