"use strict";
/**
 * `GlaceJS` proxy runner.
 *
 * @module
 */

require("vorpal");
require("colors");  // should be required after `vorpal` only.
require("./help");

var U = require("glacejs-utils");

var Commands = require("./commands");
var CONF = require("./config");
var interactive = require("./interactive");
/**
 * Proxy runner.
 *
 * @function
 */
module.exports.run = () => {
    var cmd = new Commands(CONF, { logger: console.log, colored: true });

    Promise
        .resolve()
        .then(() => {
            if (CONF.proxy.global) return cmd.launchGlobalProxy();
        })
        .then(() => cmd.launchHttpProxy())
        .then(() => {
            if (CONF.chrome.launch) return cmd.launchChrome();
        })
        .then(() => interactive(cmd))
        .catch(e => U.exit("Promise error"));
};

process.on("uncaughtException", U.exit("Uncaught Exception"));
process.on("unhandledRejection", U.exit("Unhandled Rejection"));
