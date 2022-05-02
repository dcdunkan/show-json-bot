import { DetaAdapter } from "../../deps.ts";
import env from "../env.ts";

export interface SessionData {
  json_showed: number;
}

export function initial(): SessionData {
  return { json_showed: 0 };
}

export const storage = new DetaAdapter({
  baseName: "users", // backward compatibility
  projectKey: env.DETA_KEY,
});
