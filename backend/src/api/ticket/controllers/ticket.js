'use strict'

/**
 * ticket controller
 */

const {createCoreController} = require('@strapi/strapi').factories

module.exports = createCoreController('api::ticket.ticket', ({strapi}) => ({
  // extended core controllers
  async create(ctx) {
    console.log(ctx.request.body)
    const userId = ctx.state.user.id
    const body = ctx.request.body.data
    const entry = await strapi.entityService.create('api::ticket.ticket', {
      data: {
        creator: userId,
        priority: body.priority,
        subject: body.subject,
        description: body.description,
        category: body.category,
      },
    })
    return entry
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
