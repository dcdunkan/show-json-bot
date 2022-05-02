import { Composer } from "../../deps.ts";
import { Context } from "../helpers/context.ts";

export const help = new Composer<Context>();

help.command("help", async (ctx) => {
  await ctx.reply(`Send or forward me a message :)
  
See the README in the GitHub repository: github.com/dcdunkan/show-json-bot`);
});
