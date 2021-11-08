export default async (ctx) => {
  ctx.reply(
    `👋🏼 Hi. I can show you JSON data of any message. Send me a message, just like this one. And I will show you the raw data telegram send me. It might help you with Telegram Bot API stuff and also for getting data like user ID, chat ID, file ID, etc.\n\n— Creator: @dcdunkan from @dcbots. Join @dcbots and support us.\n\n<b>Built using</>\n— <a href='https://grammy.dev'>grammY</a> - A Telegram Bot API framework (<a href='github.com/grammyjs/grammY'>GitHub</a>)\n\n📚 This is an Open-Source project. Source code can be found here: https://github.com/dcdunkan/show-json-bot.\n\n/rate — Rate this bot.`,
    {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }
  );
};
