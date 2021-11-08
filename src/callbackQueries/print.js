export default (ctx) => {
  ctx.answerCallbackQuery();
  let toPrint;
  ctx.callbackQuery.message.reply_markup.inline_keyboard.forEach((row) => {
    row.forEach((button) => {
      if (button.callback_data == ctx.callbackQuery.data) toPrint = button.text;
      return false;
    });
  });
  ctx.reply(`<code>${toPrint}</code>`, {
    parse_mode: "HTML",
  });
};
