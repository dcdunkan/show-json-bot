import { bot } from "./src/bot.ts";

bot.start({
  onStart: ({ username }) => console.log(`${username} started`),
});
