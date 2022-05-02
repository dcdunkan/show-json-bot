import { Composer } from "../../deps.ts";
import { Context } from "../helpers/context.ts";

export const start = new Composer<Context>();

start.command("start", async (ctx) => {
  await ctx.reply(
    "👋🏼 Hiya! I can show you the JSON data of any message. By @dcdunkan from @dcbots.",
  );
});
