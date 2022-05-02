<h1 align="center">Show JSON Bot</h1>

### Try the running bot here: [Show JSON Bot](https://telegram.me/jsoonbot)

A simple Telegram Bot to show JSON data of Telegram messages. The JSON data is
the updates that Telegram sent to the bot. The bot also provides an UI to
navigate through the JSON object. The workflow is highly inspired by
[JSONShowBot](https://telegram.me/JSONShowBot) which is **NOT** working as of
May 2, 2022.

Re-written in [TypeScript](https://typescriptlang.org/) and now it runs on
[Deno](https://deno.land/).

- [Built Using](#built-using)
- [Setup](#setup) › [Running Locally](#running-locally)
- [Setup](#setup) › [Deno Deploy](#deno-deploy)
- [Setup](#setup) › [Environment Variables](#environment-variables)

<div align="center">
<table>
<tbody>
<td align="center">
<img width="2000" height="0"><br>
<b>It's a re-write! See the old version: <a href="https://github.com/dcdunkan/show-json-bot/tree/node">node/</a></b><br>
<sub><a href="https://github.com/dcdunkan/show-json-bot/tree/node">https://github.com/dcdunkan/show-json-bot/tree/node</a></sub><br>
<img width="2000" height="0">
</td>
</tbody>
</table>
</div>

## Built Using

Thanks to these tools and libraries.

1. _[grammY](https://grammy.dev)_ - The Telegram Bot Framework.
2. _[Deta.sh Base](https://deta.sh)_ - Free and unlimited Cloud Database
   service.

## Setup

### Running Locally

Make sure you have installed [Deno CLI](https://deno.land/).

- Clone the repository.
  ```bash
  git clone https://github.com/dcdunkan/show-json-bot.git
  ```
- Change directory (`cd`) to the cloned repository.
- Create a `.env` file and set [environment variables](#environment-variables)
  like in [`.env.example`](.env.example).
- Run the bot using the command below.
  ```bash
  deno run --allow-net --allow-env --allow-read mod.ts
  ```

  **Required permissions**
  - `--allow-net` - To communicate with Telegram servers and receive updates.
  - `--allow-env` - To access environment variables.
  - `--allow-read` - To read <samp>.env</samp> file.

If everything is done correct, you should see "(Username) started" in your
console.

### Deno Deploy

The working bot, [@jsoonbot](https://telegram.me/jsoonbot) is currently deployed
on **[Deno Deploy](https://deno.com/deploy) (Beta)**.

Click the button to deploy to [Deno Deploy](https://deno.com/deploy).

<div align="center">

<div align="center">
<a href="https://dash.deno.com/new?url=https://raw.githubusercontent.com/dcdunkan/show-json-bot/main/mod.ts&env=BOT_TOKEN,DETA_KEY">
<table>
<tbody>
<td align="center">
<img width="2000" height="0"><br>
<b>Deploy to <ins>Deno Deploy</ins></a></b><br>
<img width="2000" height="0">
</td>
</tbody>
</table>
</a>
</div>

</div>

After deploying you will get a link to your application, in the format
<samp><ins>https://\<appname>.deno.dev/</ins></samp>.

Open a browser and go to the link down below.

- Replace the `<TOKEN>` with your `BOT_TOKEN`.
- Replace `<APP_URL>` with the link to your application.

`https://api.telegram.org/bot<TOKEN>/setWebhook?url=<APP_URL>`

This will set the bot's webhook to the deployed application, so that Telegram
will sent further updates to there.

### Environment Variables

| Variable    | Required? | Description                                                                      |
| ----------- | --------- | -------------------------------------------------------------------------------- |
| `BOT_TOKEN` | **Yes.**  | The API token of the Bot. Chat with https://t.me/BotFather to get one.           |
| `DETA_KEY`  | **Yes.**  | Project Key of Deta.sh Project. Sign up and create a project at https://deta.sh. |

## License

[MIT License](LICENSE). Copyright (c) 2022 dcdunkan (Dunkan)

## Contributing

Feel free to contribute! And if you are having issues or if you want suggest
something, please open an issue here:
[dcdunkan/show-json-bot/issues](https://github.com/dcdunkan/show-json-bot/issues).
Or, open a [PQ](https://telegram.me/grammyjs/34358)!

---

<p align="center">
  <b>Made with ❤️ and ☕</b><br>
  <samp>
    <a href="https://telegram.me/dcbots">channel</a> ~
    <a href="https://telegram.me/jsoonbot">demo bot</a>
  </samp>
</p>
