"use strict";

var sinon = require("sinon");

var Commands = require("../../lib/commands");
var CONF = require("../../lib/config");

scope("commands", () => {
    var cmd;
    
    beforeChunk(() => {
        cmd = new Commands(CONF, { logger: () => {},
                                   isRunning: sinon.stub(),
                                  });
    });

    test(".setProxiedUrl()", () => {

        chunk("updates url in config", async () => {
            var url = "https://yandex.ru";
            expect(CONF.web.url).to.not.be.equal(url);
            expect(await cmd.setProxiedUrl(url)).to.be.true;
            expect(CONF.web.url).to.be.equal(url);
        });

        chunk("updates url in http proxy if it's running", async () => {
            cmd._httpProxy = { isRunning: true,
                                 setUrl: sinon.spy() };
            expect(await cmd.setProxiedUrl()).to.be.true;
            expect(cmd._httpProxy.setUrl.calledOnce).to.be.true;
        });

        chunk("restarts chrome browser if it's running", async () => {
            cmd._chrome = { pid: 1 };
            cmd.__isRunning.returns(true);
            cmd.restartChrome = sinon.stub().returns(true);
            expect(await cmd.setProxiedUrl()).to.be.true;
            expect(cmd.restartChrome.calledOnce).to.be.true;
        });
    });

    test(".stopHttpProxy()", () => {

        chunk("stops http proxy", async () => {
            cmd._httpProxy = {
                isRunning: true,
                stop: sinon.spy(),
            };
            expect(await cmd.stopHttpProxy()).to.be.true;
            expect(cmd._httpProxy.stop.calledOnce).to.be.true;
        });

        chunk("is skipped if http proxy isn't launched", async () => {
            expect(await cmd.stopHttpProxy()).to.be.false;
        });
    });

    test(".stopGlobalProxy()", () => {

        chunk("stops global proxy", async () => {
            cmd._globalProxy = {
                isRunning: true,
                stop: sinon.spy(),
            };
            expect(await cmd.stopGlobalProxy()).to.be.true;
            expect(cmd._globalProxy.stop.calledOnce).to.be.true;
        });

        chunk("is skipped if global proxy isn't launched", async () => {
            expect(await cmd.stopGlobalProxy()).to.be.false;
        });
    });

    test("._isHttpProxyLaunched()", () => {

        chunk("returns false if http proxy doesn't exit", () => {
            expect(cmd._isHttpProxyLaunched()).to.be.false;
        });

        chunk("returns false if http proxy isn't running", () => {
            cmd._httpProxy = { isRunning: false };
            expect(cmd._isHttpProxyLaunched()).to.be.false;
        });

        chunk("returns true if http proxy is running", () => {
            cmd._httpProxy = { isRunning: true };
            expect(cmd._isHttpProxyLaunched()).to.be.true;
        });
    });

    test("._isGlobalProxyLaunched()", () => {

        chunk("returns false if global proxy doesn't exit", () => {
            expect(cmd._isGlobalProxyLaunched()).to.be.false;
        });

        chunk("returns false if global proxy isn't running", () => {
            cmd._globalProxy = { isRunning: false };
            expect(cmd._isGlobalProxyLaunched()).to.be.false;
        });

        chunk("returns true if global proxy is running", () => {
            cmd._globalProxy = { isRunning: true };
            expect(cmd._isGlobalProxyLaunched()).to.be.true;
        });
    });

    test("._isChromeLaunched()", () => {

        chunk("returns false if chrome doesn't exit", () => {
            expect(cmd._isChromeLaunched()).to.be.false;
        });

        chunk("returns false if chrome isn't running", () => {
            cmd._chrome = { pid: 1 };
            cmd.__isRunning.returns(false);
            expect(cmd._isChromeLaunched()).to.be.false;
        });

        chunk("returns true if chrome is running", () => {
            cmd._chrome = { pid: 1 };
            cmd.__isRunning.returns(true);
            expect(cmd._isChromeLaunched()).to.be.true;
        });
    });

    test("._checkProxy()", () => {

        chunk("returns true if http proxy is running", () => {
            cmd._httpProxy = { isRunning: true };
            expect(cmd._checkProxy()).to.be.true;
        });

        chunk("returns true if global proxy is running", () => {
            cmd._httpProxy = { isRunning: true };
            expect(cmd._checkProxy()).to.be.true;
        });

        chunk("returns false if no proxy is running", () => {
            expect(cmd._checkProxy()).to.be.false;
        });
    });
});
