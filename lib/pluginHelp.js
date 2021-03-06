"use strict";
/**
 * `Proxy` plugin help.
 * 
 * @function
 */
module.exports = (args, d) => {
    return args
        .options({
            "http-proxy": {
                describe: d("Use http proxy."),
                type: "boolean",
                group: "Proxy:",
            },
            "http-proxy-port [number]": {
                describe: d("Port for http proxy. Default is random.",
                    "Incompatible with '--slaves' option."),
                type: "number",
                group: "Proxy:",
            },
            "global-proxy": {
                describe: d("Use transparent global proxy."),
                type: "boolean",
                group: "Proxy:",
            },
            "global-proxy-port [number]": {
                describe: d("Port for transparent global proxy.",
                    "Default is random. Incompatible with '--slaves' option."),
                type: "number",
                group: "Proxy:",
            },
            "cache": {
                describe: d("Enable middleware to cache proxy responses to disk."),
                type: "boolean",
                group: "Proxy:",
            },
            "existing-cache": {
                describe: d("Use existing cache if it exists."),
                type: "boolean",
                group: "Proxy:",
            },
            "cache-folder [folder]": {
                describe: d("Folder to put cached server responses.",
                    "Default is 'cwd/.proxy-cache'."),
                type: "string",
                group: "Proxy:",
            },
            "speed <value>": {
                describe: d("Proxy speed, kb/s."),
                type: "number",
                group: "Proxy:",
            },
            "install-certificate": {
                describe: d("Install global proxy certificate as trusted.",
                    "Requires administrator permissions."),
                type: "boolean",
                group: "Proxy:",
            },
            "ssl-ca-dir [folder]": {
                describe: d("Folder to put generated self-signed ssl certificates."),
                type: "string",
                group: "Proxy:",
            },
            "reconnect [value]": {
                describe: d("Number of proxy reconnects on request error.",
                    "Default is 2."),
                type: "number",
                group: "Proxy:",
            },
        });
};
