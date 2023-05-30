'use strict'

/**
 * ticket controller
 */

const {createCoreController} = require('@strapi/strapi').factories

module.exports = createCoreController('api::ticket.ticket', ({strapi}) => ({
  async create(ctx) {
    //TODO creator auf user id setzen
    //     creationDate auf den jetzigen Zeitpunkt setzen
    let entity

    console.log(ctx.request.body)

    // Manipuliere das Anfrage-Body vor der Erstellung
    //ctx.request.body.field1 = "Neuer Wert für Feld 1";
    //ctx.request.body.field2 = "Neuer Wert für Feld 2";

    // Calling the default core action
    const {data, meta} = await super.create(ctx)

    return {data, meta}
  },
  async own(ctx) {
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
              populate: ['avatar'],
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
