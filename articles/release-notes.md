### v1.4.0

- Updated dependencies to fresh versions.

### v1.3.9

- [Used](https://github.com/glacejs/glace-proxy/commit/88ec57028bcafd6777b3921486d36b0b629f2570) features factory.

### v1.3.8

- [Updated](https://github.com/glacejs/glace-proxy/commit/fe5574dcdf16b44e3ac47a88abf6bb39b1317ecd) log message format.

### v1.3.7

- Updated `glace-core`.
- Started to use `$` only.

### v1.3.6

- [Started](https://github.com/glacejs/glace-proxy/commit/23cd707e11ab8791e187cab9bed4e5a01855b840) to support slaves mechanism.

### v1.3.5

- [Choose](https://github.com/glacejs/glace-proxy/commit/7357f863db63f0f9320af5ea0d7ed6d2e348ea4b) global proxy port randomly by default.

### v1.3.4

- Updated dependencies.

### v1.3.3

- [Added](https://github.com/glacejs/glace-proxy/commit/e75b9352fc089a3f70f990a8a3691c444696fc2b) [allure](https://docs.qameta.io/allure/) steps.

### v1.3.2

- [Changed](https://github.com/glacejs/glace-proxy/commit/b937f451382e979bd0c32d024f37784a7969c4c4) logging level for cache.
- [Fixed](https://github.com/glacejs/glace-proxy/commit/e5b52d86e6cb16940dec0efb43d98e15f4c8aed0) bug that ctx can be null on mitm proxy error.

### v1.3.1

- [Restore](https://github.com/glacejs/glace-proxy/commit/0d713af7b8b64d93c42f31be5ce09574a4d5e02c) web url after stop HTTP proxy.

### v1.3.0

- [Added](https://github.com/glacejs/glace-proxy/commit/d99e368909b55978f2b00664bb010b9320e9c03c) project workflow commands.
- [Expanded](https://github.com/glacejs/glace-proxy/commit/d99e368909b55978f2b00664bb010b9320e9c03c) plugin help.
- [Logged](https://github.com/glacejs/glace-proxy/commit/4d5fd832cedb45a0edffd437593adf06a51301f7) steps.

### v1.2.9

- [Used](https://github.com/glacejs/glace-proxy/commit/5cbaf120c8c93c61b4e99890ff3a697e8eba277d) docstring style in steps.

### v1.2.8

- [Added](https://github.com/glacejs/glace-proxy/commit/72aefab361c2266ff365044abb36592807ded232) feature to manage requests and responses proxy speed separately and together.

### v1.2.7

- [Fixed](https://github.com/glacejs/glace-proxy/commit/5159b0952d1b921b6b660308e280167ccd2352ff) bug that on reconnect http proxy didn't use proxy options.

### v1.2.6

- Fixed typo in help: use `--web-url` CLI option instead of wrong `--url`.

### v1.2.5

- Chrome is restarted if any proxy is stopped and it was launched.
- Ability to pass custom chrome options in command to launch chrome.
- Multiple fixes of bugs found by unit and e2e tests.
