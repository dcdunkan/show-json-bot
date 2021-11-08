import bot from "./bot";
import env from "./env";

import express, { json } from "express";
import { webhookCallback } from "grammy";

const domain = process.env.DOMAIN;
const secretPath = env.BOT_TOKEN;
const app = express();

app.use(json());
app.use(`/${secretPath}`, webhookCallback(bot, "express"));

app.listen(process.env.PORT, async () => {
  await bot.api
    .setWebhook(`https://${domain}/${secretPath}`)
    .then(async () => {
      console.log(
        `Bot API Webhook has been set to https://${domain}/${secretPath}`
      );
      await bot.init();
      if (env.CHAT_LOG === true) {
        let msg = `<a href="t.me/${bot.botInfo.username}">JSON Bot</a> started.\n#show_json_bot @${bot.botInfo.username}.`;
        await bot.api.sendMessage(process.env.CHAT_ID, msg, {
          parse_mode: "HTML",
          disable_web_page_preview: true,
        });
      }
    })
    .catch((error) => {
      console.log("Bot API Webhook setting failed:", error);
    });
});
