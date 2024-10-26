<h2 align="center">flowcatch</h2>
<p align="center">Client and CLI for flowcatch.io, a service that delivers webhooks to your local development environment.</p>
<p align="center"><a href="https://npmjs.com/package/flowcatch"><img src="https://img.shields.io/npm/v/flowcatch/latest.svg" alt="NPM"></a> <a href="https://travis-ci.com/khulnasoft-bot/flowcatch"><img src="https://badgen.now.sh/travis/khulnasoft-bot/flowcatch" alt="Build Status"></a> <a href="https://codecov.io/gh/khulnasoft-bot/flowcatch/"><img src="https://badgen.now.sh/codecov/c/github/khulnasoft-bot/flowcatch" alt="Codecov"></a></p>

<p align="center"><a href="https://github.com/khulnasoft-bot/flowcatch.io">Looking for <strong>khulnasoft-bot/flowcatch.io</strong>?</a></p>

## Installation

Install the client with:

```sh
npm install -g flowcatch
```

## Usage

### CLI

The `flowcatch` command will forward webhooks from flowcatch.io to your local development environment.

```sh
flowcatch
```

Run `flowcatch --help` for usage.

### Node Client

```js
const FlowcatchClient = require('flowcatch')

const flowcatch = new FlowcatchClient({
  source: 'https://flowcatch.io/abc123',
  target: 'http://localhost:3000/events',
  logger: console
})

const events = flowcatch.start()

// Stop forwarding events
events.close()
```

#### Proxy

By default, the Flowcatch client does not make use of the standard proxy server environment variables. To add support for proxy servers you will need to provide an https client that supports them such as [`undici.EnvHttpProxyAgent()`](https://undici.nodejs.org/#/docs/api/EnvHttpProxyAgent).

Afterwards, you will be able to use the standard proxy server environment variables.

For example, this would use a `EnvHttpProxyAgent` to make requests through a proxy server:

```js
const { EnvHttpProxyAgent, fetch: undiciFetch } = require("undici");
const FlowcatchClient = require('flowcatch');

const myFetch = (url, options) => {
  return undiciFetch(url, {
    ...options,
    dispatcher: new EnvHTTPProxyAgent()
  })
};

const flowcatch = new FlowcatchClient({
  source: 'https://flowcatch.io/abc123',
  target: 'http://localhost:3000/events',
  logger: console,
  fetch: myFetch
});

const events = flowcatch.start();
```
