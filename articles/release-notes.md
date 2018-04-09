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
