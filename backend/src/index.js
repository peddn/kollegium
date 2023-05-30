'use strict'

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({strapi}) {
    // create the standard roles for the application
    strapi.log.info('Creating standard roles:')

    const roles = ['Teacher', 'Supporter', 'Principal']

    for (const role of roles) {
      let exists = await strapi.db
        .query('plugin::users-permissions.role')
        .findOne({
          where: {name: role},
        })

      if (!exists) {
        exists = await strapi.db
          .query('plugin::users-permissions.role')
          .create({
            data: {
              name: role,
              description: `The role for ${role}s`,
              type: role.toLowerCase(),
            },
          })
        strapi.log.info(`Created new role [${role}]`)
      } else {
        strapi.log.info(`Role [${role}] already exists.`)
      }
    }

    const doDemoTickets = process.env.CREATE_DEMO_TICKETS
    if (doDemoTickets === 'true') {
      // get all tickets who begin with '[DEMO-TICKET]'
      const entries = await strapi.entityService.findMany(
        'api::ticket.ticket',
        {
          filters: {
            subject: {
              $startsWith: '[DEMO-TICKET]',
            },
          },
        },
      )

      const demoTicketsCount = entries.length

      strapi.log.info(`Found ${demoTicketsCount} demo tickets.`)

      if (demoTicketsCount < 10) {
        const missingCount = 10 - demoTicketsCount

        for (let i = 0; i < missingCount; i++) {
          strapi.log.info(`Creating missing ticket ${i + 1}`)
          // const entry = await strapi.entityService.create('api::article.article', {
          //   data: {
          //     title: 'My Article',
          //   },
          // });
        }
      }
    }

    // // title must be unique
    // const entries = await strapi.entityService.findOne('api::ticket.ticket', {
    //   filters: {
    //     title: {
    //       $eq: 'Hello World',
    //     },
    //   },
    // })

    // console.log(entries)
  },
}
