'use strict'

/**
 * subject controller
 */

const {createCoreController} = require('@strapi/strapi').factories

module.exports = createCoreController('api::subject.subject', ({strapi}) => ({
  async own(ctx) {
    const userId = ctx.state.user.id
    const entries = await strapi.entityService.findMany(
      'api::subject.subject',
      {
        filters: {
          users: {
            id: {
              $eq: userId,
            },
          },
        },
      },
    )
    return entries
  },
}))
