import { Composer, InlineKeyboardButton } from "../../deps.ts";
import { Context } from "../helpers/context.ts";

export const print = new Composer<Context>();

print.callbackQuery(/print-(.+)-(.+)/, async (ctx) => {
  await ctx.answerCallbackQuery();

  const keyboard = ctx.callbackQuery.message?.reply_markup?.inline_keyboard;
  if (!keyboard) return;

  for (const row of keyboard) {
    for (const btn of row as InlineKeyboardButton.CallbackButton[]) {
      if (btn.callback_data === ctx.callbackQuery.data) {
        await ctx.reply(`<code>${btn.text}</code>`);
        break;
      }
    }
  }
});
