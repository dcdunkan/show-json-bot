import { DenoKVAdapter } from "../deps.ts";

export interface SessionData {
    json_showed: number;
}

export function initial(): SessionData {
    return { json_showed: 0 };
}

export const kv = await Deno.openKv();

export const storage = new DenoKVAdapter(kv, ["users"]);
