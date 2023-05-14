"use strict";

/**
 * group controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::group.group", ({ strapi }) => ({
  async own(ctx) {
    const userId = ctx.state.user.id;
    const entries = await strapi.entityService.findMany("api::group.group", {
      filters: {
        users: {
          id: {
            $eq: userId,
          },
        },
      },
      populate: {
        students: true,
        users: true,
      },
    });
    return entries;
  },
  async ownId(ctx) {
    const userId = ctx.state.user.id;
    const group = await strapi.entityService.findOne(
      "api::group.group",
      ctx.params.id,
      {
        //fields: ['title', 'description'],
        populate: {
          students: true,
          users: true,
        },
      }
    );

    // check if the user is part of the users relation
    if (group !== null) {
      let userIds = [];
      for (let user of group.users) {
        userIds.push(user.id);
      }
      if (userIds.includes(userId)) {
        return group;
      } else {
        return ctx.badRequest("Bad Request.");
      }
    } else {
      return ctx.badRequest("Bad Request.");
    }
  },
}));
