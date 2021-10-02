import { cleanEnv, str, bool, url, num, port } from "envalid";
import { config } from "dotenv";

config();

export default cleanEnv(process.env, {
  BOT_TOKEN: str({
    desc: "The Telegram bot API token",
    example: "abcd:123456...",
  }),
  DOMAIN: str(),
  PORT: port(),

  // Firebase
  DB_ENABLE: bool({
    desc: "Set to true if you want to logging users to Firebase and Update users in channel.",
    default: false,
  }),

  // Channel Log
  CHANNEL_LOG: bool({
    default: false,
    desc: "Set to true if you want to log messages in a Telegram channel",
  }),
});
