// Please, DO NOT touch this thing, -- it somehow works, you know!

import { Context } from "../helpers/context.ts";
import { Composer, InlineKeyboard, Message, ReplyMessage } from "../../deps.ts";

export const navigation = new Composer<Context>();

navigation.callbackQuery(/go-(.+)-(.+)/, async (ctx) => {
  if (!ctx.match || !ctx.callbackQuery.message?.text) {
    return await ctx.answerCallbackQuery("Invalid query");
  }

  await ctx.answerCallbackQuery();
  const destinationKey = ctx.match[1] as keyof ReplyMessage;
  const destinationIndex = parseInt(ctx.match[2]);
  const message = ctx.callbackQuery.message.text.split("\n");
  const update_id = message[0].split(": ")[1];

  // [0: "update", 1: "message", 2: "chat", ...]
  const directions = message[1].split(" / ") as Array<
    keyof ReplyMessage | "message"
  >;

  let toGoBack = directions[directions.length - 1];
  if (destinationIndex === directions.length - 2) {
    directions.splice(directions.length - 2, 2);
    toGoBack = directions[directions.length - 1];
  }

  const keyboard = new InlineKeyboard();
  if (destinationIndex > 1) {
    keyboard
      .text("⤴️", `go-${toGoBack}-${destinationIndex - 1}`)
      .text("‏‏‎ ‎", "do-nothing")
      .row();
  }

  directions.push(destinationKey);
  if (!toGoBack) return await ctx.answerCallbackQuery("Can't go back :(");

  let path = ctx.callbackQuery.message.reply_to_message as ReplyMessage & {
    message: Message;
  } & undefined;

  for (let i = 2; i < directions.length; i++) path = path[directions[i]];

  for (const pair of Object.entries(path)) {
    keyboard.text(pair[0], `print-key-${pair[0]}`);
    typeof pair[1] == "object"
      ? keyboard.text("Object 📂", `go-${pair[0]}-${destinationIndex + 1}`)
      : keyboard.text(`${pair[1]}`, `print-value-${pair[0]}`);
    keyboard.row();
  }

  await ctx.editMessageText(
    `update_id: <code>${update_id}</code>
<code>${directions.join("</code> / <code>")}</code>`,
    { reply_markup: keyboard },
  );
});
