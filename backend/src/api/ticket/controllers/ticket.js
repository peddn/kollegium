'use strict'

/**
 * ticket controller
 */

const {createCoreController} = require('@strapi/strapi').factories

const {sanitize} = require('@strapi/utils')
const {contentAPI} = sanitize

module.exports = createCoreController('api::ticket.ticket', ({strapi}) => ({
  // extended core controllers
  async create(ctx) {
    // get the user ID of the logged in user
    const userId = ctx.state.user.id

    // sanitize client query params
    const contentType = strapi.contentType('api::ticket.ticket')
    const sanitizedQueryParams = await contentAPI.query(
      ctx.query,
      contentType,
      ctx.state.auth,
    )

    const sanitizedInput = await contentAPI.input(
      ctx.request.body.data,
      contentType,
      ctx.state.auth,
    )

    // add data
    sanitizedQueryParams.data = {
      creator: userId,
      priority: sanitizedInput.priority,
      subject: sanitizedInput.subject,
      description: sanitizedInput.description,
      category: sanitizedInput.category,
    }

    // create the new ticket
    const ticket = await strapi.entityService.create(
      contentType.uid,
      sanitizedQueryParams,
    )

    // return the new sanitized ticket
    return await contentAPI.output(ticket, contentType, ctx.state.auth)
  },

  async readOwn(ctx) {
    // get the user ID of the logged in user
    const userId = ctx.state.user.id

    // sanitize client query params
    const contentType = strapi.contentType('api::ticket.ticket')
    const sanitizedQueryParams = await contentAPI.query(
      ctx.query,
      contentType,
      ctx.state.auth,
    )

    // add filter to only get tickets created by the logged in user
    sanitizedQueryParams.filters = {
      creator: {
        id: {
          $eq: userId,
        },
      },
    }

    // populate with history data
    sanitizedQueryParams.populate = {
      //fields: ['id', 'username', 'email'],
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
      //creator: {
      //  populate: ['avatar'],
      //  fields: ['id', 'username', 'email'],
      //},
    }

    // find the tickets
    const tickets = await strapi.entityService.findMany(
      contentType.uid,
      sanitizedQueryParams,
    )

    // return the sanitized tickets
    return await contentAPI.output(tickets, contentType, ctx.state.auth)
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
