import { SessionData } from "./session.ts";
import { BaseContext, SessionFlavor } from "../../deps.ts";

export type Context =
  & BaseContext
  & SessionFlavor<SessionData>;
