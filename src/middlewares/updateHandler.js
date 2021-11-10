import db from "../db";
import env from "../env";

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default async (ctx, next) => {
  // This bot is only configured to work in private chats.
  if (ctx.chat.type !== "private") return;

  // CallbackQueries is not being managed here.
  if (ctx.callbackQuery) return await next();
  if (!ctx.message && !ctx.editedMessage) return;

  let data = JSON.stringify(ctx.update, undefined, 2);

  let escaped = escapeHtml(data);
  let msg_arr = [
    `<pre><code class="language-json">${escaped}</code></pre>`,
  ];

  if (escaped.length > 4096) {
  	let limit = Math.ceil(escaped.length / 4096);
    msg_arr.shift();
    for (let i = 1; i <= limit; i++) {
      msg_arr.push(
        `<pre><code class="language-json">${escapeHtml(
          data.substring((i - 1) * 4096, i * 4096)
        )}</code></pre>`
      );
    }
  }
  
  // Send split messages.
  for (let msg of msg_arr) {
    await ctx.reply(msg, {
      parse_mode: "HTML",
      reply_to_message_id:
        ctx.message !== undefined
          ? ctx.message.message_id
          : ctx.editedMessage.message_id,
      disable_web_page_preview: true,
    });
  }

  // Inline Keyboard buttons creating using keys.
  const keyboard = [];
  const pairs = Object.entries(ctx.update);
  for(let pair of pairs) {
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
  }

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
