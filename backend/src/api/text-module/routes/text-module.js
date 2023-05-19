'use strict'

/**
 * text-module router
 */

const {createCoreRouter} = require('@strapi/strapi').factories

module.exports = createCoreRouter('api::text-module.text-module')
