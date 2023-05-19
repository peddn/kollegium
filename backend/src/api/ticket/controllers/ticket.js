'use strict'

/**
 * ticket controller
 */

const {createCoreController} = require('@strapi/strapi').factories

module.exports = createCoreController('api::ticket.ticket', ({strapi}) => ({
  async own(ctx) {
    const userId = ctx.state.user.id
    const entries = await strapi.entityService.findMany('api::group.group', {
      filters: {
        users: {
          id: {
            $eq: userId,
          },
        },
      },
      populate: {},
    })
    return entries
  },
}))
