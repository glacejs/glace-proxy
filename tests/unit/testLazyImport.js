"use strict";

var _ = require("lodash");
var glaceProxy = require("../../lib");


test("Plugin lazy import", () => {

    chunk("empty by default", () => {
        expect(_.isEmpty(glaceProxy)).to.be.true;
    });

    chunk("has config", () => {
        expect(glaceProxy.config).to.exist;
    });

    chunk("has plugin help", () => {
        expect(glaceProxy.pluginHelp).to.exist;
    });

    chunk("has steps", () => {
        expect(glaceProxy.Steps).to.exist;
    });
});
