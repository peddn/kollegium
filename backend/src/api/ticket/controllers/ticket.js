'use strict'

/**
 * ticket controller
 */

const {createCoreController} = require('@strapi/strapi').factories

module.exports = createCoreController('api::ticket.ticket', ({strapi}) => ({
  // extended core controllers
  async create(ctx) {
    console.log(ctx.request.body)
    // Manipuliere das Anfrage-Body vor der Erstellung
    //ctx.request.body.field1 = "Neuer Wert für Feld 1";
    //ctx.request.body.field2 = "Neuer Wert für Feld 2";

    // Calling the default core action
    const {data, meta} = await super.create(ctx)

    return {data, meta}
  },

  async readOwn(ctx) {
    // get the user ID of the logged in user
    const userId = ctx.state.user.id
    // find the data
    const entries = await strapi.entityService.findMany('api::ticket.ticket', {
      sort: {createdAt: 'asc'},
      filters: {
        creator: {
          id: {
            $eq: userId,
          },
        },
      },

      populate: {
        // populate the repeatable component 'history'
        history: {
          sort: 'changeDate:asc',
          populate: {
            supporter: {
              populate: ['role', 'avatar'],
              fields: ['id', 'username', 'email'],
            },
          },
        },
        // populate the 'creator' relation
        creator: {
          populate: ['avatar'],
          fields: ['id', 'username', 'email'],
        },
      },
    })
    return entries
  },

  async updateOwn(ctx) {
    console.log(ctx.request.body)
    // some logic here
    const {data, meta} = await super.update(ctx)
    // some more logic

    return {data, meta}
  },

  async external(ctx) {
    // get the user ID of the logged in user
    //const userId = ctx.state.user.id
    // find the data

    const {ticket_type, ticket_number, description, internal_ticket_uuid} =
      ctx.request.body
    console.log(ticket_type, ticket_number, description, internal_ticket_uuid)

    ctx.send(
      {
        message: 'The content was created!',
      },
      200,
    )
  },
}))
