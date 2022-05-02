import { cleanEnv, config, str } from "../deps.ts";
await config({ export: true });

export default cleanEnv(Deno.env.toObject(), {
  BOT_TOKEN: str(),
  DETA_KEY: str(),
});
