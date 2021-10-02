import env from "./env";
import db from "./db";
import numberToWords from "number-to-words";

// Importing Bot constructor from "grammy" framework. See grammy.dev for more.
import { Bot, GrammyError, HttpError } from "grammy"; // npmjs.com/package/grammy
import Logger from "./utils/channel-logger";
// New bot with bot token. See telegram.me/botfather for an bot token.
const bot = new Bot(env.BOT_TOKEN);
const clog = new Logger(bot);

// Launch log.
if (env.CHANNEL_LOG === true) {
  clog.log("start");
}

// middleware to manage any incoming message updates and return starter data structure.
bot.use(async (ctx, next) => {
  // This bot is only configured to work in private chats. You might be able to change it, but I can't assure you it will work.
  if (ctx.chat.type !== "private") return;

  if (db.db) {
    db.existing(ctx.from.id).then(async (exists) => {
      if (exists) return;
      db.writeUser(ctx.from.id, ctx.from.username || "x");
      if (env.CHANNEL_LOG === true) {
        const users = await db.getUsersCount();
        clog.updateUserCount(users);
      }
    });
  }

  // CallbackQueries is not being managed here.
  if (ctx.callbackQuery) return next();
  // If there is no actual message should return. And also by using "editedMessage", gets ability to manage edited messages too.
  if (!ctx.message && !ctx.editedMessage) return;

  let data = JSON.stringify(ctx.update, undefined, 2);

  let msg_arr = [`<pre><code class="language-json">${data}</code></pre>`];

  // Splitting takes less than 0.050ms, mostly around 0.020ms.
  if (msg_arr[0].length > 4096) {
    msg_arr.shift();
    for (let i = 1; i <= 2; i++) {
      msg_arr.push(
        `<pre><code class="language-json">${data.substr(
          (i - 1) * 4050,
          i * 4050
        )}</code></pre>`
      );
    }
  }
  // Send split messages.
  msg_arr.forEach(async (msg) => {
    await ctx.reply(msg, {
      parse_mode: "HTML",
      reply_to_message_id:
        ctx.message !== undefined
          ? ctx.message.message_id
          : ctx.editedMessage.message_id,
      disable_web_page_preview: true,
    });
  });

  // Inline Keyboard buttons creating using keys.
  const keyboard = [];
  Object.entries(ctx.update).forEach((pair) => {
    // => update_id, message || edited_message || callback_query
    if (typeof pair[1] == "object")
      keyboard.push([
        { text: `${pair[0]}`, callback_data: `print-key-${pair[0]}` },
        { text: `Object 📂`, callback_data: `go-${pair[0]}-1` },
      ]);
    else
      keyboard.push([
        { text: `${pair[0]}`, callback_data: `print-key-${pair[0]}` },
        { text: `${pair[1]}`, callback_data: `print-value-${pair[0]}` },
      ]);
  });

  await ctx
    .reply(`update_id: <code>${ctx.update.update_id}</code>,\nupdate`, {
      parse_mode: "HTML",
      reply_to_message_id:
        ctx.message !== undefined
          ? ctx.message.message_id
          : ctx.editedMessage.message_id,
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: keyboard,
      },
    })
    .then(async () => {
      if (db.db) {
        db.incrementTotalJsonShowed(ctx.from.id).then(async () => {
          if (env.CHANNEL_LOG === true) {
            const json_showed = await db.getJsonShowedCount();
            // It is not getting updated accurately with just "json_showed"
            clog.updateShowedCount(json_showed + 1);
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  next();
});

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
  if (env.CHANNEL_LOG === true) clog.log("error", error_message);
});

process.on("uncaughtException", (error) => {
  if (env.CHANNEL_LOG === true)
    clog.log(
      "error",
      `${error.name}\n${error.message}\n${error.stack}\n${error.error}`
    );
});

// Navigation thorugh the object structure.
bot.callbackQuery(/go-(.+)-(.+)/, async (ctx) => {
  // ctx.match[1] is created from pair0. String contains name of destination.
  const where = ctx.match[1];
  // ctx.match[2] is index of pair0 going page.
  let whereIndex = parseInt(ctx.match[2]);

  // "string_split"
  let msg = ctx.callbackQuery.message.text.split(",\n");
  let update_id = msg[0].split(": ")[1];
  let directions = msg[1].split(" / ");
  // ^ -> [ "update", "message", "chat", "..." ]
  //        0         1          2       3...
  let toGoBack = directions[directions.length - 1];

  if (whereIndex == directions.length - 2) {
    directions.splice(directions.length - 2, 2);
    toGoBack = directions[directions.length - 1];
  }

  let keyboard = [];
  if (whereIndex !== 0)
    keyboard.push([
      { text: "⤴️", callback_data: `go-${toGoBack}-${whereIndex - 1}` }, //
      { text: "‏‏‎ ‎", callback_data: "do-nothing" },
    ]);

  directions.push(where);
  if (toGoBack === undefined) {
    keyboard.shift();
    directions.push("message");
    whereIndex++;
    await ctx.answerCallbackQuery({
      text: "Due to some limitations, you cannot go back ay further. Don't worry, you have everything here.",
      show_alert: true,
    });
  }

  let path = ctx.callbackQuery.message.reply_to_message;

  for (let i = 2; i < directions.length; i++) {
    path = path[directions[i]];
  }

  Object.entries(path).forEach((pair) => {
    if (typeof pair[1] == "object")
      keyboard.push([
        { text: `${pair[0]}`, callback_data: `print-key-${pair[0]}` },
        {
          text: `Object 📂`,
          callback_data: `go-${pair[0]}-${whereIndex + 1}`,
        },
      ]);
    else
      keyboard.push([
        { text: `${pair[0]}`, callback_data: `print-key-${pair[0]}` },
        { text: `${pair[1]}`, callback_data: `print-value-${pair[0]}` },
      ]);
  });

  let direction = directions.join(" / ");
  ctx.editMessageText(`update_id: <code>${update_id}</code>,\n${direction}`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
});

// Data can be print if they got clicked (Non-object data - both key & value)
bot.callbackQuery(/print-(.+)-(.+)/, (ctx) => {
  let id = ctx.match[2],
    toPrint;
  ctx.callbackQuery.message.reply_markup.inline_keyboard.forEach((row) => {
    row.forEach((button) => {
      if (button.callback_data == ctx.callbackQuery.data) toPrint = button.text;
      return false;
    });
  });
  ctx.reply(`<code>${toPrint}</code>`, {
    parse_mode: "HTML",
  });
});

// Just nothing.
bot.callbackQuery("do-nothing", (ctx) => {
  ctx.answerCallbackQuery({
    text: "Come on! You know I do nothing 🥲",
    show_alert: true,
  });
});

// Start command.
bot.command("start", async (ctx) => {
  await ctx.reply(
    "Hello. I can show you JSON raw data of Telegram messages. It could be useful at some points. From @dcbots - Join for more."
  );
});

// Help and about commands, outputs the same thing.
bot.command(["help", "about"], (ctx) => {
  ctx.reply(
    'Send me a message, just like this one. And I will show you the raw data telegram send me.\nMade with 🤍 by @dcdunkan from @dcbots,\nusing <i><b><a href="npmjs.com/package/grammy">grammy</a></b></i> | <i><b><a href="grammy.dev">docs</a></b></i> | <i><b><a href="github.com/grammyjs/grammY">github</a></b></i>\n📚 Opensource: github.com/dcdunkan/show-json-bot',
    {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }
  );
});

bot.command("me", async (ctx) => {
  let json_showed = Number(await db.getJsonShowedCountForUser(ctx.from.id));
  let message = `I have printed ${json_showed} message JSON data for you this far!\nIn words, ${numberToWords.toWords(
    json_showed
  )} JSON!\n\n`;

  await ctx.api
    .getChatMember("@dcbots", ctx.from.id)
    .then(() => {
      message += `🎈 And by the way, thank you for using the bot and subscribing to our channel. If you haven't already, please consider giving it a 5⭐️ (as you like, I just want a review) rating at <a href="https://t.me/tlgrmcbot?start=jsoonbot-review">Telegramic</a>.`;
    })
    .catch(() => {
      message += `🎈 And by the way, thank you for using the bot. But, 😕 hmm... Its sad that you haven't subscribed to our channel yet :)\nPlease consider Joining our channel for more bots and updates, if you can. Also, if you haven't already, please consider giving it a 5⭐️ (as you like, I just want a review) rating at <a href="https://t.me/tlgrmcbot?start=jsoonbot-review">Telegramic</a>.`;
    });
    // rating at BotsArchive and 
  ctx.reply(message, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_to_message_id: ctx.message.message_id,
    reply_markup: {
      inline_keyboard: [
        [{ text: "📢 Our Channel", url: "https://telegram.me/dcbots" }],
        // [
        //   {
        //     text: "⭐️ Rate on BotsArchive",
        //     url: "https://telegram.me/dcbots",
        //   },
        // ],
        [
          {
            text: "⭐️ Rate on Telegramic",
            url: "https://telegram.me/tlgrmcbot?start=jsoonbot-review",
          },
        ],
      ],
    },
  });
});

export default bot;
