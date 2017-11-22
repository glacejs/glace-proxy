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

/**
 * Contains `GlaceJS` proxy configuration.
 * 
 * @namespace
 * @prop {?string} [url=null] - Proxied URL.
 * @prop {object} cache - Cache config.
 * @prop {number} [cache.ttl] - Time to life cache. Default is maximum.
 * @prop {number} [cache.size] - Maximum cached file size. Default is 10 GB.
 * @prop {boolean} [cache.use=false] - Use cache.
 * @prop {boolean} [cache.existing=false] - Use existing cache if exists.
 * @prop {boolean} [cache.folder=cwd/.proxy-cache] - Cache folder.
 * @prop {object} chrome - Chrome config.
 * @prop {boolean} [chrome.launch=false] - Launch chrome browser.
 * @prop {boolean} [chrome.incognito=false] - Use incognito mode in chrome.
 * @prop {object} log - Log config.
 * @prop {string} [log.level=debug] - Log level.
 * @prop {string} [log.path=cwd/glace-proxy.log] - Log file path.
 * @prop {boolean} [log.stdout=false] - Print log messages to terminal.
 * @prop {object} proxy - Proxy config.
 * @prop {number} [proxy.timeout=60000] - Proxy time to wait for remote response, ms.
 * @prop {number} [proxy.http=false] - Launch http proxy.
 * @prop {number} [proxy.port=0] - Proxy port. By default will be assigned by OS.
 * @prop {boolean} [proxy.global=false] - Launch global proxy.
 * @prop {number} [proxy.globalPort=8888] - Global proxy port.
 * @prop {boolean} [proxy.installCertificates] - Install global proxy certificates
 *  as trusted. Windows only. Admin privileges are required.
 * @prop {number} [proxy.reconnect=2] - Number of reconnect attemptions if
 *  remote side breaks connection.
 */
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
config.proxy.http = !!argsConfig.httpProxy;  // default is `false`
config.proxy.port = argsConfig.proxyPort || 0;  // default is random
config.proxy.global = !!argsConfig.globalProxy;  //default `false`
config.proxy.globalPort = argsConfig.globalProxyPort || 8888;
config.proxy.shortPort = argsConfig.shortLinkPort || 0;  // default is random
config.proxy.speed = argsConfig.speed;  // default unlimited
config.proxy.installCertificate = !!argsConfig.installCertificate;  //default `false`
config.proxy.reconnect = argsConfig.reconnect || 2;  // TODO maybe to make as CLI option

config.cache.use = !!argsConfig.cache || !!argsConfig.existingCache;  // default `false`
config.cache.existing = !!argsConfig.existingCache;  // default `false`
config.cache.folder = path.resolve(cwd, (argsConfig.cacheFolder || ".proxy-cache"));

config.chrome.launch = !!argsConfig.chrome;  // default `false`
config.chrome.incognito = !!argsConfig.chromeIncognito;  // default `false`

config.log.path = path.resolve(cwd, (argsConfig.log || "glace-proxy.log"));
config.log.stdout = !!argsConfig.stdoutLog;  // default `false`
