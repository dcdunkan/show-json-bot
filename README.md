# Show JSON Bot

### A Telegram Bot for printing out the JSON data of a message sent or forwarded with support of navigating through the data and selecting individual data.

### [Demo](https://telegram.me/jsoonbot) — [Channel](https://telegram.me/dcbots) — [Deploy](#deploy)

Telegram bot that can show the JSON raw data of a sent message, appended with functioning buttons to navigate through the JSON object. This bot's working flow is inspired by [JSONShowBot](https://telegram.me/JSONShowBot) which is **not** working as of November 2021.

The code is not perfect. Still have minor (major?) bugs.

## Built Using
- [grammY](https://github.com/grammyjs/grammY): Telegram Bot Framework. ([Docs](https://grammy.dev) - [npm](https://npmjs.com/package/grammy))
- [Deta.sh](https://deta.sh): NoSQL Database.
- Packages: [`deta`](https://npmjs.com/package/deta), [`dotenv`](https://npmjs.com/package/dotenv), [`envalid`](https://npmjs.com/package/envalid), [`express`](https://npmjs.com/package/express), [`grammy`](https://npmjs.com/package/grammy),  [`number-to-words`](https://npmjs.com/package/number-to-words)

<details><summary><b>Screenshots</b></summary>

![1](https://user-images.githubusercontent.com/70066170/135612943-cc78e9b6-889c-4b8f-909a-a21195b9a3a6.jpg)

![2](https://user-images.githubusercontent.com/70066170/135613287-420747c7-d685-48c3-973b-d8893fbffba0.jpg)

</details>


## Running Locally
- Clone this repository: `git clone https://github.com/dcdunkan/show-json-bot`
- Install dependencies: `npm install`.
- Create a `.env` file and set ENV variables except `DOMAIN` - Like in `.env.example` file. Set optionals if you want to. 
- Add the following to the end of `src/bot.js`
  ```js
  bot.start();
  ```
- Run: `npm run local`.

## Deploy</b>

You don't really have to deploy this. Running one, [here - @jsoonbot](https://telegram.me/jsoonbot). See the [environment variable](#environment-variables) section for deploying details.

You can deploy to [Heroku](https://heroku.com) or [Railway](https://railway.app). Both of them has a free plan with some limits. The [demo bot](https://telegram.me/jsoonbot) is running on [Heroku](https://heroku.com).

- [Deploy to Heroku](https://heroku.com/deploy?template=https://github.com/dcdunkan/show-json-bot)
- [Deploy to Railway](https://bit.ly/3mQLgFb)


## Environment Variables
2 kinds of environmental variables. You must to set [required ENV vars](#required-environment-variables). You can set [optionals](#optional-environment-variables) if you want the additional features(?) as said in the descriptions.

### Required Environment Variables

This is all you need to setup this bot basically. Don't care about `DB_ENABLE` and `CHAT_LOG` if you only want basic (main focus of this bot) things to work.


| Variable | Description |
| --- | --- |
| `BOT_TOKEN` | You can get a Telegram Bot token by chatting with the BotFather here: [BotFather](https://telegram.org/BotFather) |
| `DOMAIN` | This bot uses Webhooks to recieve updates from Telegram. Set this to your app's domain without `https://` or `http://` or an `/` at the end. For example, on heroku, `<appname>.herokuapp.com` |

### Optional Environment Variables
| Variable | Required? | Description |
| --- | --- | --- |
| `DB_ENABLE` | *Optional.* | Defaults to `false`. Set this to `true` if you want the bot to store user IDs and user count to [Deta.sh Bases](https://deta.sh). You have to configure `DETA_KEY` also. |
| `DETA_KEY` | *Required, if `DB_ENABLE` is `true`.* | [Deta.sh](https://deta.sh) project key. Create a free account in deta, and create a new project from dashboard, copy it's project key and set it here. |
| `CHAT_LOG` | *Optional.* | Defaults to `false`. Set to `true`, if you want to log errors, up status, total user count and total number of JSON showed to a Telegram Chat. |
| `CHAT_ID` | *Required, if `CHAT_LOG` is `true`.* | A Telegram Chat ID where the bot have permission to send messages. The bot will log errors, up status in this chat. |
| `USERS_MSG_ID` | *Required, if both `DB_ENABLE` and `CHAT_LOG` is set to `true`.* | Set this to a valid id of an existing message in your `CHAT ID`. Bot should have permission to edit message. Set this if you want the bot to update user count in the log chat. |
| `SHOWED_JSON_MSG_ID` | *Required, if both `DB_ENABLE` and `CHAT_LOG` is set to `true`.* | Set this to a valid id of an existing message in your `CHAT ID`. Bot should have permission to edit message. Set this if you want the bot to update total json showed count in the log chat. |


If you liked this repo or the [bot](https://telegram.me/jsoonbot), please consider giving ⭐️ Star. Also, join our channel for more bot updates: [Bots.DC](https://telegram.me/dcbots)


<!-- 
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fdcdunkan%2Fshow-json-bot&envs=BOT_TOKEN%2CDB_ENABLE%2CDETA_KEY%2CCHAT_LOG%2CCHAT_ID%2CUSERS_MSG_ID%2CSHOWED_JSON_MSG_ID%2CDOMAIN&optionalEnvs=DETA_KEY%2CCHAT_ID%2CUSERS_MSG_ID%2CSHOWED_JSON_MSG_ID&BOT_TOKENDesc=Get+this+value+from+%40BotFather+on+Telegram+by+creating+a+new+bot.&DB_ENABLEDesc=Set+to+true+if+you+want+to+logging+users+to+Deta.sh+and+Update+users+in+channel.&DETA_KEYDesc=Deta.sh+project+key.+Create+a+free+account+in+deta%2C+and+create+a+new+project+from+dashboard%2C+copy+it%27s+project+key+and+set+it+here.&CHAT_LOGDesc=Set+to+true+if+you+want+start%2Ferror+log+to+private%2Fpublic+chat.&CHAT_IDDesc=ID+of+the+chat+you+want+to+log+messages.+And+the+bot+must+be+admin+with+send+and+edit+message+permission.+Only+set+if+CHAT_LOG+is+true.&USERS_MSG_IDDesc=ID+of+a+message+in+the+Channel+to+update+number+of+users.+Only+set+if+both+DB_ENABLE+and+CHAT_LOG+is+true.&SHOWED_JSON_MSG_IDDesc=ID+of+the+message+which+has+number+of+total+printed+JSONs.++Only+set+if+both+DB_ENABLE+and+CHAT_LOG+is+true.&DOMAINDesc=Domain+of+this+app%2C+without+https+and+slash+%28%2F%29+at+the+end.+&DB_ENABLEDefault=false&CHAT_LOGDefault=false&USERS_MSG_IDDefault=3&SHOWED_JSON_MSG_IDDefault=4&referralCode=APTGETX)
-->
