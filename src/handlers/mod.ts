import { Composer } from "../../deps.ts";
import { Context } from "../helpers/context.ts";

import { updates } from "./updates.ts";
import { start } from "./start.ts";
import { print } from "./print.ts";
import { navigation } from "./navigation.ts";
import { stats } from "./stats.ts";
import { help } from "./help.ts";

export const handlers = new Composer<Context>();

handlers
  .use(updates)
  .use(start)
  .use(print)
  .use(navigation)
  .use(stats)
  .use(help);
