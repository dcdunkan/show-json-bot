import { bot } from "./bot.ts";
import { webhookCallback } from "./deps.ts";

if (Deno.env.get("DEBUG") != null) {
    bot.start({
        drop_pending_updates: true,
        onStart: (info) => console.log(info.username, "started."),
    });
} else {
    const SECRET_PATHNAME = "/" + bot.token;
    const handleUpdate = webhookCallback(bot, "std/http");
    await bot.init();
    Deno.serve({
        onError: (error) => {
            console.error(error);
            return new Response("Internal Server Error", { status: 500 });
        },
    }, async (req) => {
        const { pathname } = new URL(req.url);
        if (req.method == "POST" && pathname === SECRET_PATHNAME) {
            return await handleUpdate(req);
        }
        return Response.redirect(`https://t.me/${bot.botInfo.username}`);
    });
}
