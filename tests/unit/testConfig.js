"use strict";

var CONF = require("../../lib/config");

test("config", () => {

    chunk("has 'web' section", () => {
        expect(CONF.web).to.exist;
    });
});
