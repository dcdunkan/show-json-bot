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
  DB_URL: url({
    desc: "Firebase Real-Time Database URL",
    example: "https://projectname-default-rtdb.firebaseio.com",
  }),
  PROJECT_ID: str({
    desc: "Project ID of the Firebase Project",
    example: "grammy",
  }),
  PRIVATE_KEY: str({
    desc: "A long Private Key string of Firebase Project.",
    example: "----BEGIN PRIVATE KEY---...",
  }),
  CLIENT_EMAIL: str({ desc: "Client Email ID of Firebase Project." }),
  // Channel Log
  CHANNEL_LOG: bool({
    default: false,
    desc: "Set to true if you want to log messages in a Telegram channel",
  }),
  CHANNEL_ID: num({
    desc: "The channel ID where the bot is admin to log messages.",
    example: -10083623634,
  }),
  USERS_MSG_ID: num({
    default: 2,
    desc: "ID of the message which has number of users. This message will get edited (updated) when users increases.",
  }),
  SHOWED_JSON_MSG_ID: num({
    default: 3,
    desc: "ID of the message which has number of total printed JSONs. This will get updated.",
  }),
});
