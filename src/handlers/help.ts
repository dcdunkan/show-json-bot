import { Composer } from "../../deps.ts";
import { Context } from "../helpers/context.ts";

export const help = new Composer<Context>();

help.command("help", async (ctx) => {
  await ctx.reply(`See the README in the source code for more information
GitHub repository: github.com/dcdunkan/show-json-bot`);
});
