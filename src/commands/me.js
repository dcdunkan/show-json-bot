import { InlineKeyboard } from "grammy";
import db from "../db";
import numberToWords from "number-to-words";

export default async (ctx) => {
  if (!db.up) return;

  let json_showed = Number(await db.getJsonShowedCountForUser(ctx.from.id));
  let message = `I have printed ${json_showed} message JSON data for you this far!\nIn words, ${numberToWords.toWords(
    json_showed
  )} JSON!\n\n`;

  await ctx.api
    .getChatMember("@dcbots", ctx.from.id)
    .then(() => {
      message += `🎈 And by the way, thank you for using the bot and subscribing to our channel. And, if you haven't already, please consider giving it a 5⭐️ (as you like, I just want a review) on <a href="http://t.me/botsarchive/2255">BotsArchive</> and <a href="https://telegram.me/tlgrmcbot?start=jsoonbot-review">Telegramic</>.`;
    })
    .catch(() => {
      message += `🎈 And by the way, thank you for using the bot. Also, please consider joining our channel and supporting us :)\nAnd, if you haven't already, please consider giving it a 5⭐️ (as you like, I just want a review) on <a href="http://t.me/botsarchive/2255">BotsArchive</> and <a href="https://telegram.me/tlgrmcbot?start=jsoonbot-review">Telegramic</>.`;
    });

  await ctx.reply(message, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_to_message_id: ctx.message.message_id,
    reply_markup: new InlineKeyboard()
      .url("📢 Our Channel", "https://t.me/dcbots")
      .row()
      .url("⭐️ Rate on BotsArchive", "http://t.me/botsarchive/2255")
      .row()
      .url(
        "⭐️ Rate on Telegramic",
        "https://telegram.me/tlgrmcbot?start=jsoonbot-review"
      ),
  });
};
