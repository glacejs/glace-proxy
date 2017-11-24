"use strict";
/**
 * `GlaceJS` proxy.
 *
 * @module
 *
 * @property {object} Commands - {@link module:commands|Commands} module.
 * @property {object} GlobalProxy - {@link module:globalProxy|GlobalProxy} module.
 * @property {object} HttpProxy - {@link module:httpProxy|HttpProxy} module.
 * @property {object} Steps - {@link module:steps|Steps} module.
 */
module.exports = {
    Commands: require("./commands"),
    config: require("./config"),
    GlobalProxy: require("./globalProxy"),
    HttpProxy: require("./httpProxy"),
    Steps: require("./steps"),
};
