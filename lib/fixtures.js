"use strict";
/**
 * `Proxy` fixtures.
 *
 * @module
 */

/**
 * Fixture to launch http proxy.
 * 
 * @global
 * @function
 * @arg {function} func - Test funciton.
 */
global.fixHttpProxy = func => {
    var isStarted;

    before(async () => {
        isStarted = await SS.startProxy();
    });

    func();

    after(async () => {
        if (!isStarted) return;
        await SS.stopProxy();
    });
};
/**
 * Fixture to launch http proxy.
 * 
 * @global
 * @function
 * @arg {function} func - Test funciton.
 */
global.fixGlobalProxy = func => {
    var isStarted;

    before(async () => {
        isStarted = await SS.startGlobalProxy();
    });

    func();

    after(async () => {
        if (!isStarted) return;
        await SS.stopGlobalProxy();
    });
};
