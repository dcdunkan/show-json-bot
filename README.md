<h1 align="center">Show JSON Bot</h1>

### Try the running bot here: [Show JSON Bot](https://telegram.me/jsoonbot)

A simple Telegram Bot to show JSON data of Telegram messages. The JSON data is
the updates that Telegram sent to the bot. The bot also provides an UI to
navigate through the JSON object. The workflow is highly inspired by
[JSONShowBot](https://telegram.me/JSONShowBot) which is **NOT** working as of
May 2, 2022 (Still a nope in Nov, 2024).

Re-written in [TypeScript](https://typescriptlang.org/) and now it runs on
[Deno](https://deno.land/).

- [Built Using](#built-using)
- [Setup](#setup) › [Running Locally](#running-locally)
- [Setup](#setup) › [Deno Deploy](#deno-deploy)
- [Setup](#setup) › [Environment Variables](#environment-variables)

This is a re-write. See the old version
[here](https://github.com/dcdunkan/show-json-bot/tree/node).

## Built Using

Thanks to these tools and libraries.

1. [grammY](https://grammy.dev) - The Telegram Bot Framework.
2. [Deno KV](https://deno.com/kv) - KV Database.

## Setup

### Running Locally

Make sure you have installed [Deno CLI](https://deno.land/).

- Clone the repository.
  ```bash
  git clone https://github.com/dcdunkan/show-json-bot.git
  ```
- Change directory (`cd`) to the cloned repository.
- Run the bot using the command below.
  ```bash
  DEBUG=1 BOT_TOKEN="<your-token>" deno -E=BOT_TOKEN,DEBUG -N=api.telegram.org -I mod.ts
  ```

See the list of [environment variables](#environment-variables).

**Required permissions**

- `net` - To communicate with Telegram servers and receive updates.
- `env` - To access environment variables.

If everything is done correct, you should see "(Username) started" in your
console.

### Deno Deploy

The working bot, [@jsoonbot](https://telegram.me/jsoonbot) is currently deployed
on **[Deno Deploy](https://deno.com/deploy)**.

After deploying you will get a link to your application, in the format
`https://<appname>.deno.dev/`.

Open a browser and go to the link down below.

- Replace the `<TOKEN>` with your `BOT_TOKEN`.
- Replace `<APP_URL>` with the link to your application.

`https://api.telegram.org/bot<TOKEN>/setWebhook?url=<APP_URL>/<TOKEN>`

This will set the bot's webhook to the deployed application, so that Telegram
will sent further updates to there.

### Environment Variables

| Variable    | Required? | Description                                                                    |
| ----------- | --------- | ------------------------------------------------------------------------------ |
| `DEBUG`     | No.       | If not set, the bot would run in the webhook mode. Set to enable long polling. |
| `BOT_TOKEN` | **Yes.**  | The API token of the Bot. Chat with https://t.me/BotFather to get one.         |

## License

This application is licensed under the MIT License. See the LICENSE file for
more information on copying and distributing this piece of software.

## Contributing

Feel free to contribute! And if you are having issues or if you want suggest
something, please open an issue here:
[dcdunkan/show-json-bot/issues](https://github.com/dcdunkan/show-json-bot/issues).
Or, open a [PQ](https://telegram.me/grammyjs/34358)!

---

<p align="center">
  <b>Made with ❤️ and ☕</b><br>
  <samp>
    <a href="https://t.me/dcbots">channel</a> ~
    <a href="https://t.me/jsoonbot">public instance bot</a>
  </samp>
</p>
