'use strict';

/**
 * coffee-shop service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::coffee-shop.coffee-shop');
