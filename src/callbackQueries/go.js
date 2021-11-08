// Don't touch this thing, leave it alone - it somehow works!

export default async (ctx) => {
  ctx.answerCallbackQuery();
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
};
