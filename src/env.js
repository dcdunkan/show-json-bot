const { cleanEnv, str, bool, url, host, port } = require('envalid');
const dotenv = require('dotenv');

dotenv.config();

module.exports = cleanEnv(process.env, {
    BOT_TOKEN: str({ desc: 'The Telegram bot API token' }),
    API_ROOT: url({ default: 'https://api.telegram.org' }),
    LOCAL_API_ROOT: bool({ default: false })
});