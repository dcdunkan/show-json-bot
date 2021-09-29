import env from "../env";

class Logger {
  constructor (bot) {
    this.bot = bot;
    this.c_id = env.CHANNEL_ID;
    this.users_msg = env.USERS_MSG_ID;
    this.showed_msg = env.SHOWED_JSON_MSG_ID;
    this.options = {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    };
  }

  print = (content) => {
    this.bot.api.sendMessage(this.c_id, content, this.options)
  };

  edit = (message_id, content) => {
    this.bot.api.editMessageText(this.c_id, message_id, content, this.options)
  };

  log = (content, extra) => {
    switch (content) {
      case "start":
        this.print(`<b><i>{ <a href="t.me/jsoonbot">JSON Bot</a> }</i> started.</b>\nState changed from down to up. (<a href="dashboard.heroku.com/apps/json-show-botx/logs">Logs</a>)\n#show_json_bot_started #show_json_bot @jsoonbot.`)
        break;
      case "error":
        this.print(`<b><i>⚠️ <a href="t.me/jsoonbot">JSON Bot</a> ⚠️</i> error log:</b>\n${extra}\n(<a href="dashboard.heroku.com/apps/json-show-botx/logs">Logs</a>)\n#show_json_bot_error #show_json_bot @jsoonbot.`)
        break;
      case "stop":
        this.print(`<b><i>❌ <a href="t.me/jsoonbot">JSON Bot</a></i> Stopped.</b>\n${extra}`)
    }
  };

  updateUserCount = (usersCount) => {
    this.edit(this.users_msg, `${usersCount}`);
  };

  updateShowedCount = (showedCount) => {
    this.edit(this.showed_msg, `${showedCount}`);
  };
}

export default Logger;