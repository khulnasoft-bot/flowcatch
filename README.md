<h1 align="center"><a href="https://flowcatch">flowcatch</a></h1>

<p align="center">
  Webhook payload delivery service<br>
  <a href="#usage">Usage</a> •
  <a href="#how-it-works">How it works</a> •
  <a href="#deploying-your-own-FLOWCATCHio">Deploying your own Flowcatch</a> •
  <a href="#faq">FAQ</a>
</p>

<p align="center"><a href="https://github.com/khulnasoft-bot/flowcatch"><img alt="GitHub Actions status" src="https://github.com/khulnasoft-bot/flowcatch/workflows/Node%20CI/badge.svg"> <a href="https://codecov.io/gh/khulnasoft-bot/flowcatch/"><img src="https://badgen.now.sh/codecov/c/github/khulnasoft-bot/flowcatch" alt="Codecov"></a></p>

<p align="center"><a href="https://github.com/khulnasoft-bot/flowcatch-client">Looking for <strong>khulnasoft-bot/flowcatch-client</strong>?</a></p>

## Usage

Flowcatch is a webhook payload delivery service - it receives webhook payloads, and sends them to listening clients. You can generate a new channel by visiting https://flowcatch, and get a unique URL to send payloads to.

> **Heads up**! Flowcatch is intended for use in development, not for production. It's a way to inspect payloads through a UI and receive them on a local machine, not as a proxy for production applications.

## How it works

Flowcatch works with two components: the public website [flowcatch](https://flowcatch/) and the [`flowcatch-client`](https://github.com/khulnasoft-bot/flowcatch-client). They talk to each other via [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events), a type of connection that allows for messages to be sent from a source to any clients listening.

This means that channels are just an abstraction - all Flowcatch does is get a payload and sends it to any _actively connected clients_.

## Deploying your own Flowcatch

Flowcatch is a simple Node.js application. You can deploy it any way you would deploy any other Node app. The easier solution is probably Heroku, or you can use Docker:

```shell
docker run -p 3000:3000 ghcr.io/khulnasoft-bot/flowcatch
```

Don't forget to point `flowcatch-client` to your instance of `flowcatch`:

```shell
FLOWCATCH --url https://your-flowcatch/channel
```

### Running multiple instances of Flowcatch

If you need to run multiple instances of the web app, you need a way to share events across those instances. A client may be connected to instance A, so if a relevant event is sent to instance B, instance A needs to know about it too.

For that reason, Flowcatch has built-in support for Redis as a message bus. To enable it, just set a `REDIS_URL` environment variable. That will tell the app to use Redis when receiving payloads, and to publish them from each instance of the app.

## FAQ

**How long do channels live for?**

Channels are always active - once a client is connected, Flowcatch will send any payloads it gets at `/:channel` to those clients.

**Should I use this in production?**

No! Flowcatch is not designed for production use - it is a development and testing tool. Note that channels are _not authenticated_, so if someone has your channel ID they can see the payloads being sent, so it is _not_ secure for production use.

**Are payloads ever stored?**

Webhook payloads are never stored on the server, or in any database; the Flowcatch server is simply a pass-through. However, we do store payloads in `localStorage` in your browser, so that revisiting `https://flowcatch/:channel` will persist the payloads you saw there last.
