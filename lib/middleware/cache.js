"use strict";
/**
 * Middleware to cache responses.
 *
 * @module
 */

var fs = require("fs");
var path = require("path");

var _ = require("lodash");
var cacheManager = require("cache-manager");
var fsStore = require("cache-manager-fs");
var rimraf = require("rimraf");

var CONF = require("../config");
var logger = require("../logger");

if (!CONF.cache.useExisting && fs.existsSync(CONF.cache.folder)) {
    rimraf.sync(CONF.cache.folder);
};

var diskCache, inited;

var init = opts => {
    opts = opts || {};
    opts.force = opts.force || false;

    if (!inited || opts.force) {
        inited = new Promise(resolve => {

            var fillcb = null;
            if (CONF.cache.useExisting) fillcb = resolve;

            diskCache = cacheManager.caching({
                store: fsStore,
                options: {
                    ttl: CONF.cache.ttl,
                    maxsize: CONF.cache.size,
                    path: CONF.cache.folder,
                    preventfill: !CONF.cache.useExisting,
                    fillcallback: fillcb } });

            if (!CONF.cache.useExisting) resolve();
        });
    };
    return inited;
};
init();

/**
 * Middleware to cache server responses and reply them.
 *
 * @function
 * @this BaseProxy
 * @return {boolean} - `true` if response was retrieved from cache, `false`
 *  otherwise.
 */
var cache = module.exports = async function () {
    if (!this.useCache) return false;
    if (!diskCache) return false;

    for (var skipped of cache.skipped) {
        if (skipped(this.req.url)) return false;
    };

    var req = this.req;
    var res = this.res;

    if (await fromCache(req, res)) {
        return true;
    } else {
        toCache(req, res);
        return false;
    };
};
/**
 * @property {function[]} skipped - List of functions to skip cache.
 */
cache.skipped = [];
/**
 * Initializes cache. Does nothing if it is initialized already and no force option.
 *
 * @function
 * @arg {object} [opts] - Initialization options.
 * @arg {boolean} [opts.force=false] - Force reinitialize cache.
 * @return {Promise}
 */
cache.init = init;
/**
 * Patches http response to send response from cache, if it is there.
 *
 * @function
 * @arg {object} req - http(s) request
 * @arg {object} res - http(s) response
 * @return {Promise.<boolean>} - `true` if response is in cache and
 *  was patched, otherwise `false`
 */
var fromCache = (req, res) => {
    return new Promise((resolve, reject) => {

        diskCache.get(_getReqKey(req), (err, result) => {
            if (err) reject(err);
            resolve(result);
        });

    }).then(cached => {

        if (!cached) return false;
        logger.debug("<<< from cache:", _getReqKey(req));
        var response = JSON.parse(cached);
        res.writeHead(response.code, response.headers);
        res.end(Buffer.from(response.data));
        return true;
    });
};
/**
 * Patches http response to put response to cache.
 *
 * @function
 * @arg {object} req - http(s) request
 * @arg {object} res - http(s) response
 */
var toCache = (req, res) => {

    var resWrite = res.write;
    var resEnd = res.end;

    var chunks = [];

    res.write = function (chunk) {
        if (chunk instanceof Buffer) chunks.push(chunk);
        resWrite.apply(this, arguments);
    };

    res.end = function (chunk) {
        if (chunk instanceof Buffer) chunks.push(chunk);
        var resData = JSON.stringify({ data: Buffer.concat(chunks).toJSON(),
                                       code: res.statusCode,
                                       headers: res.headers });
        logger.debug(">>> to cache:", _getReqKey(req));
        diskCache.set(_getReqKey(req), resData);
        resEnd.apply(this, arguments);
    };
};
