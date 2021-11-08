import { cleanEnv, str, bool, port } from "envalid";
import { config } from "dotenv";

config();

export default cleanEnv(process.env, {
  BOT_TOKEN: str(),
  DB_ENABLE: bool({
    default: false,
  }),
  CHAT_LOG: bool({
    default: false,
  }),
});
