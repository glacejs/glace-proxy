"use strict";
/**
 * Proxy middlewares.
 *
 * @module
 */

module.exports = [
    require("./reqBody"),
    require("./resHead"),
    require("./speed"),
    require("./info"),
    require("./cache"),
];
