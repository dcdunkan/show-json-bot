import { Composer } from "../../deps.ts";
import { Context } from "../helpers/context.ts";

export const stats = new Composer<Context>();

stats.command("stats", async (ctx) => {
  const jsonShowed = new Intl
    .NumberFormat("en-US", { useGrouping: true })
    .format(ctx.session.json_showed);

  await ctx.reply(`I have showed you ${jsonShowed} JSON data so far!`);
});
