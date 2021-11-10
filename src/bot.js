import db from "./db";
import env from "./env";

// grammy.dev
import { Bot, GrammyError, HttpError } from "grammy";
const bot = new Bot(env.BOT_TOKEN);

if (process.env.DB_ENABLE === 'true') {
  db.init();
}

bot.catch((err) => {
  const ctx = err.ctx;
  let error_message = `Error while handling update ${ctx.update.update_id}:\n`;
  const e = err.error;
  if (e instanceof GrammyError) {
    error_message += "Error in request:" + e.description;
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    error_message += `Could not contact Telegram: ${JSON.stringify(e)}`;
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
  if (env.CHAT_LOG === true) {
    let msg = `<a href="t.me/${bot.botInfo.username}">JSON Bot</a> error log:\n${error_message}\n#show_json_bot @${bot.botInfo.username}.`;
    bot.api.sendMessage(process.env.CHAT_ID, msg, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
  }
});

// middleware to manage any incoming message updates and return starter data structure.
import updateHandler from "./middlewares/updateHandler";
bot.use(updateHandler);

// Navigation thorugh the object structure.
import navigationHandler from "./callbackQueries/go";
bot.callbackQuery(/go-(.+)-(.+)/, navigationHandler);

// Data can be print if they got clicked (Non-object data - both key & value)
import printHandler from "./callbackQueries/print";
bot.callbackQuery(/print-(.+)-(.+)/, printHandler);

bot.callbackQuery("do-nothing", (ctx) => {
  ctx.answerCallbackQuery({
    text: "Join @dcbots 😛",
    show_alert: true,
  });
});

// Commands
import startHandler from "./commands/start";
import helpHandler from "./commands/help";
import meHandler from "./commands/me";
bot.command("start", startHandler);
bot.command("help", helpHandler);

bot.command(["me", "rate"], meHandler);

export default bot;
