import { Context } from "../helpers/context.ts";
import { Composer, InlineKeyboard } from "../../deps.ts";
import { escapeHtml } from "../helpers/utils.ts";

export const updates = new Composer<Context>();

updates.use(async (ctx, next) => {
  if (ctx.chat?.type !== "private") return;
  if (ctx.callbackQuery) return await next();
  if (!ctx.message && !ctx.editedMessage) return;

  const data = JSON.stringify(ctx.update, undefined, 2);
  const escaped = escapeHtml(data);
  const total_messages = Math.ceil(escaped.length / 4096);

  for (let i = 1; i <= total_messages; i++) {
    await ctx.reply(
      `<pre><code class="language-json">${
        escapeHtml(data.substring((i - 1) * 4096, i * 4096))
      }</code></pre>`,
      {
        reply_to_message_id: ctx.message !== undefined
          ? ctx.message.message_id
          : ctx.editedMessage?.message_id,
        allow_sending_without_reply: true,
        disable_web_page_preview: true,
      },
    );
  }

  const keyboard = new InlineKeyboard();
  const pairs = Object.entries(ctx.update);

  for (const pair of pairs) {
    // => update_id, (message | edited_message)
    if (typeof pair[1] === "object") {
      keyboard
        .text(pair[0], `print-key-${pair[0]}`)
        .text("Object 📂", `go-${pair[0]}-1`);
    } else {
      keyboard
        .text(pair[0], `print-key-${pair[0]}`)
        .text(pair[1], `print-value-${pair[0]}`);
    }
    keyboard.row();
  }

  await ctx.reply(`update_id: <code>${ctx.update.update_id}</code>\nupdate`, {
    reply_markup: keyboard,
    reply_to_message_id: ctx.message !== undefined
      ? ctx.message.message_id
      : ctx.editedMessage?.message_id,
    allow_sending_without_reply: true,
    disable_web_page_preview: true,
  });
  
  ctx.session.json_showed++;

  await next();
});
