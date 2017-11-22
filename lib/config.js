"use strict";
/**
 * Configures `GlaceJS` proxy before run.
 *
 * @module
 */

var fs = require("fs");
var path = require("path");

var _ = require("lodash");
var argv = require("yargs").argv;
var expect = require("chai").expect;

var cwd = process.cwd();

/* Load CLI arguments from config */

var argsConfig = {};
var argsConfigPath = path.resolve(cwd, (argv.c || argv.config || "config.json"));

if (fs.existsSync(argsConfigPath)) {
    argsConfig = require(argsConfigPath);

    for (var key in argsConfig) {
        var val = argsConfig[key];
        argsConfig[_.camelCase(key)] = val;
    };
};
_.mergeWith(argsConfig, argv, (objVal, srcVal) => srcVal ? srcVal : objVal);

/* Set up default config */

var config = module.exports = {
    cache: {
        ttl: Number.MAX_SAFE_INTEGER,
        size: 10 * 1024 * 1024 * 1024
    },
    chrome: {
    },
    log: {
        level: "debug",
    },
    proxy: {
        timeout: 60000,
    },
};

/* Use CLI arguments */
config.url = argsConfig.url;  // proxied URL
config.proxy.port = argsConfig.proxyPort || 0;  // default is random
config.proxy.global = !!argsConfig.globalProxy;  //default `false`
config.proxy.globalPort = argsConfig.globalProxyPort || 8080;
config.proxy.shortPort = argsConfig.shortLinkPort || 0;  // default is random
config.proxy.speed = argsConfig.speed;  // default unlimited
config.proxy.installCertificate = !!argsConfig.installCertificate;  //default `false`
config.proxy.reconnect = argsConfig.reconnect || 2;  // TODO maybe to make as CLI option

config.cache.use = !!argsConfig.cache || !!argsConfig.existingCache;  // default `false`
config.cache.useExisting = !!argsConfig.existingCache;  // default `false`
config.cache.folder = path.resolve(cwd, (argsConfig.cacheFolder || ".proxy-cache"));

config.chrome.launch = !!argsConfig.chrome;  // default `false`
config.chrome.incognito = !!argsConfig.chromeIncognito;  // default `false`

config.log.path = path.resolve(cwd, (argsConfig.log || "glace-proxy.log"));
config.log.stdout = !!argsConfig.stdoutLog;  // default `false`
