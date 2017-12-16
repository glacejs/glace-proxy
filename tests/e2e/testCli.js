"use strict";

var cli = require("../../lib/cli");
var Commands = require("../../lib").Commands;

test("it's launched in terminal", () => {
    var cmd = new Commands(CONF);

    before(() => {
        CONF.web.url = "https://yandex.ru";
        CONF.proxy.global = true;
        CONF.proxy.http = true;
        CONF.chrome.launch = true;
    });

    chunk(async () => {
        await cli.run(cmd);
        expect(await cmd.closeChrome()).to.be.true;
        expect(await cmd.stopHttpProxy()).to.be.true;
        expect(await cmd.stopGlobalProxy()).to.be.true;
    });
});
