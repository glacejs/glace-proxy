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
global.fxHttpProxy = func => {
    var isStarted;

    before(async () => {
        isStarted = await SS.startHttpProxy();
    });

    func();

    after(async () => {
        if (!isStarted) return;
        await SS.stopHttpProxy();
    });
};
/**
 * Fixture to launch http proxy.
 * 
 * @global
 * @function
 * @arg {function} func - Test funciton.
 */
global.fxGlobalProxy = func => {
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
