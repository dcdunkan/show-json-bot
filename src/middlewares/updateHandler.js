import db from "../db";
import env from "../env";

export default async (ctx, next) => {
  // This bot is only configured to work in private chats.
  if (ctx.chat.type !== "private") return;

  if (db.up) {
    const { status } = await db.writeUser(ctx.from.id, ctx.from.username);
    if (status === "added" && env.CHAT_LOG === true) {
      const usersCount = await db.getUsersCount();
      if (process.env.CHAT_ID === undefined) return;
      await ctx.api.editMessageText(
        process.env.CHAT_ID,
        Number(process.env.USERS_MSG_ID),
        String(usersCount),
        {
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }
      );
    }
  }

  // CallbackQueries is not being managed here.
  if (ctx.callbackQuery) return await next();
  if (!ctx.message && !ctx.editedMessage) return;

  let data = JSON.stringify(ctx.update, undefined, 2);

  let msg_arr = [`\`\`\`${data}\`\`\``];

  if (msg_arr[0].length > 4096) {
    msg_arr.shift();
    for (let i = 1; i <= 2; i++) {
      msg_arr.push(`\`\`\`${data.substr((i - 1) * 4096, i * 4096)}\`\`\``);
    }
  }
  // Send split messages.
  for (let i = 0; i < msg_arr.length; i++) {
    await ctx.reply(msg_arr[i], {
      parse_mode: "Markdown",
      reply_to_message_id:
        ctx.message !== undefined
          ? ctx.message.message_id
          : ctx.editedMessage.message_id,
      disable_web_page_preview: true,
    });
  }

  // Inline Keyboard buttons creating using keys.
  const keyboard = [];
  Object.entries(ctx.update).forEach((pair) => {
    // => update_id, message || edited_message
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

  await ctx.reply(`update_id: <code>${ctx.update.update_id}</code>,\nupdate`, {
    parse_mode: "HTML",
    reply_to_message_id:
      ctx.message !== undefined
        ? ctx.message.message_id
        : ctx.editedMessage.message_id,
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });

  if (db.up) {
    await db.incrementJsonShowed(ctx.from.id);
    if (env.CHAT_LOG === true) {
      const json_showed = await db.getJsonShowedCount();
      if (process.env.CHAT_ID === undefined) return;
      ctx.api.editMessageText(
        process.env.CHAT_ID,
        Number(process.env.SHOWED_JSON_MSG_ID),
        String(json_showed),
        {
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }
      );
    }
  }

  await next();
};
