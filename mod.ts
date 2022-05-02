import { bot } from "./src/bot.ts";
import { serve, webhookCallback } from "./deps.ts";

const handleUpdate = webhookCallback(bot, "std/http");
await bot.init();

serve(async (req) => {
  if (req.method == "POST") {
    try {
      return await handleUpdate(req);
    } catch (err) {
      console.error(err);
      return new Response();
    }
  }

  // redirect any other requests to the bot
  return Response.redirect(`https://telegram.me/${bot.botInfo.username}`);
});
