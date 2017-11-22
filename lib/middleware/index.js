"use strict";
/**
 * Proxy middlewares.
 *
 * @module
 */

module.exports = [
    require("./reqBody"),
    require("./resHeaders"),
    require("./speed"),
    require("./info"),
    require("./cache"),
];
