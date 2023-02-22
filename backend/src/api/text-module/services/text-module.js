'use strict';

/**
 * text-module service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::text-module.text-module');
