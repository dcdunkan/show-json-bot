import express, { json } from "express";
import { webhookCallback } from "grammy";
import bot from "./bot";
import env from "./env";

const domain = env.DOMAIN;
const secretPath = env.BOT_TOKEN;
const app = express();

app.use(json());
app.use(`/${secretPath}`, webhookCallback(bot, "express"));

app.listen(process.env.PORT, async () => {
  await bot.api
    .setWebhook(`https://${domain}/${secretPath}`)
    .then(() => {
      console.log(
        `Bot API Webhook has been set to https://${domain}/${secretPath}`
      );
    })
    .catch((error) => {
      console.log("Bot API Webhook setting failed:", error);
    });
});