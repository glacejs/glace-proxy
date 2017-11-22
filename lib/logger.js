"use strict";
/**
 * Configures logging.
 *
 * @module
 */

var fs = require("fs");

var winston = require("winston");

var CONF = require("./config");

if (fs.existsSync(CONF.log.path)) fs.unlinkSync(CONF.log.path);

var logger = new winston.Logger;
logger.level = CONF.log.level;
logger.add(winston.transports.File, { filename: CONF.log.path, json: false });
if (CONF.log.stdout) logger.add(winston.transports.Console);

module.exports = logger;
