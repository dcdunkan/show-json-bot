# _Show JSON Bot_

### _A Telegram Bot for printing out the JSON data of a message sent or forwarded with support of navigating through the data._

![bla](https://user-images.githubusercontent.com/70066170/135584530-6c118536-714e-44ba-9126-a2227f6512c1.png)

### _[Demo](https://telegram.me/jsoonbot) ● [Channel](https://telegram.me/dcbots) ● [Deploy](#deploy)_

Telegram bot that can show the JSON raw data of a sent message, appended with functioning buttons to navigate through the JSON object. This bot's working flow is inspired by [JSONShowBot](https://telegram.me/JSONShowBot) which is **not** working as of September 2021.

> The code is not perfect. I ain't no pro. A noob trying to make somthing better :) Because I have made a lot of mistakes. And maybe I will fix them later.

- Made with [grammY](https://github.com/grammyjs/grammY) - [docs](https://grammy.dev) - [npm](https://npmjs.com/package/grammy)
- Other Packages: `firebase-admin`<sup>[➹](https://npmjs.com/package/firebase-admin)</sup>, `dotenv`<sup>[➹](https://npmjs.com/package/dotenv)</sup>, `envalid`<sup>[➹](https://npmjs.com/package/envalid)</sup>, `express`<sup>[➹](https://npmjs.com/package/express)</sup>

<details><summary><b>Screenshots</b></summary>

![xxd_censored](https://user-images.githubusercontent.com/70066170/135612943-cc78e9b6-889c-4b8f-909a-a21195b9a3a6.jpg)

![xxd_censored](https://user-images.githubusercontent.com/70066170/135613287-420747c7-d685-48c3-973b-d8893fbffba0.jpg)

</details>

<details><summary id="deploy"><b>Deploy</b></summary>

**Trust me, you don't have to deploy this bot, there is already a working example over [here - @jsoonbot](https://telegram.me/jsoonbot). However, incase you really really want to (for some reason):**

You can deploy to [Heroku](https://heroku.com) or [Railway](https://railway.app). Both of them has a free plan with some limits.

- Deploy to Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/dcdunkan/show-json-bot)
- Deploy to Railway:

[![Deploy on Railway](https://railway.app/button.svg)](https://bit.ly/39Uo4i7)

<details id="env-vars"><summary><b><i>Environmental Variables</i></b></summary>

Let me tell you one thing: I made this bot, I made the deployment 100% complicated.
But now, I have removed the complication as I can. You only have to configure 4 ENV vars. 2 of them, have default values too.


#### Required ENV vars

This is all you need to setup this bot basically. Don't care about `DB_ENABLE` and `CHANNEL_LOG` if you only want basic (main focus of this bot) things to work.

- `BOT_TOKEN`: The core thing to make this bot work. You can get  Telegram Bot token by chatting with Botfather here: [BotFather](https://telegram.org/BotFather)
- `DOMAIN`: This bot uses Webhooks to recieve updates from Telegram. And this value is set to your app's domain name (if heroku)

- `DB_ENABLE`: This bot has a firebase database integration to make it more complicated xD. No, it stores IDs of the users for later uses - like, broadcasting updates, and to count users. Also it stores the number of JSONs printed for users and total. So, if you don't want it just leave it to the default value `false`. Or set true, and see the database vars below at the **Optional env vars**
- `CHANNEL_LOG`: Set this to `true` if you want to log start, error messages or also update number of users and printed JSONs **inside** your Telegram channel. If you don't want to please leave it to the default: `false`. If you are setting it to `true`, see optional env vars for this to work.


#### Optional ENV vars

Some required ENV vars for optional features like database and channel logging to work.

<details id="database-setup"><summary>Database</summary>

So, you need database and you set `DB_ENABLE` to true. If so, you have to set all four of the ENV vars given below.

You can get these values by going to
[Firebase Console](https://console.firebase.google.com) -> Create a Project -> Project Settings -> Service Accounts ->

And you can choose "Generate new Private Key" and download that JSON file. Open it, get these values: `project_id`, `private_key`, `client_email`. Now assign it to the respective vars. Now go to Sidebar and choose: Realtime Database -> Create a database -> Copy it's URL and assign it to `DB_URL`.

- `DB_URL`
- `PROJECT_ID`
- `PRIVATE_KEY`
- `DB_URL`
</details>

<details><summary>Channel Logging</summary>

So, you need channel logging and I believe you set `CHANNEL_LOG` to true. If so, you have to set `CHANNEL_ID` to a valid Telegram Channel ID. You can get the channel ID by forwarding the message to our the demo bot :) or to a [ForwardInfoBot like this one](https://telegram.me/ForwardInfoBot)(Not mine). Also, you have to set 

- `CHANNEL_ID`: `required` for this feature.
- `USERS_MSG_ID`: _You have to setup database to make this work ([See above](#database-setup))._ Set this to a valid id of an existing message in your channel (Don't delete it 😐), **Only required if you want to update number of users inside your Telegram Channel**.
- `SHOWED_JSON_MSG_ID`: _You have to setup database to make this work ([See above](#database-setup))._ Just like `USERS_MSG_ID`, Set this to a valid id of an existing message in your channel (Don't delete it 😐), and **Only required if you want to update number of users inside your Telegram Channel**.

</details>

</details>

</details>

And if you liked this repo or this bot, please consider giving it a ⭐️ Star. Also, join our channel for more bot updates: [Bots.DC](https://telegram.me/dcbots)


<!-- 
(https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fdcdunkan%2Fshow-json-bot&envs=BOT_TOKEN%2CDB_ENABLE%2CDB_URL%2CPROJECT_ID%2CPRIVATE_KEY%2CCLIENT_EMAIL%2CCHANNEL_LOG%2CCHANNEL_ID%2CUSERS_MSG_ID%2CSHOWED_JSON_MSG_ID%2CDOMAIN&optionalEnvs=DB_URL%2CPROJECT_ID%2CPRIVATE_KEY%2CCLIENT_EMAIL%2CCHANNEL_ID%2CUSERS_MSG_ID%2CSHOWED_JSON_MSG_ID&BOT_TOKENDesc=Get+this+value+from+%40BotFather+on+Telegram+by+creating+a+new+bot.&DB_ENABLEDesc=Set+to+true+if+you+want+to+logging+users+to+Firebase+and+Update+users+in+channel.&DB_URLDesc=Firebase+Real-Time+Database+URL.+Set+only+if+DB_ENABLE+is+true.+See+docs+to+know+how+to+get+values%3A+github.com%2Fdcdunkan%2Fshow-json-bot&PROJECT_IDDesc=Project+ID+of+the+Firebase+Project.+Set+only+if+DB_ENABLE+is+true.+See+docs+to+know+how+to+get+values%3A+github.com%2Fdcdunkan%2Fshow-json-bot&PRIVATE_KEYDesc=A+long+Private+Key+string+of+Firebase+Project.+Set+only+if+DB_ENABLE+is+true.+See+docs+to+know+how+to+get+values%3A+github.com%2Fdcdunkan%2Fshow-json-bot&CLIENT_EMAILDesc=Client+Email+ID+of+Firebase+Project.+Set+only+if+DB_ENABLE+is+true.+See+docs+to+know+how+to+get+values%3A+github.com%2Fdcdunkan%2Fshow-json-bot&CHANNEL_LOGDesc=Set+to+true+if+you+want+start%2Ferror+log+to+private%2Fpublic+channel.&CHANNEL_IDDesc=ID+of+the+channel+you+want+to+log+messages.+And+the+bot+must+be+admin+with+edit+message+permission.+Only+set+if+CHANNEL_LOG+is+true.&USERS_MSG_IDDesc=ID+of+a+message+in+the+Channel+to+update+number+of+users.+Only+set+if+both+DB_ENABLE+and+CHANNEL_LOG+is+true.&SHOWED_JSON_MSG_IDDesc=ID+of+the+message+which+has+number+of+total+printed+JSONs.++Only+set+if+both+DB_ENABLE+and+CHANNEL_LOG+is+true.&DOMAINDesc=Domain+of+this+app%2C+without+https+and+slash+%28%2F%29+at+the+end.+&DB_ENABLEDefault=false&CHANNEL_LOGDefault=false&USERS_MSG_IDDefault=3&SHOWED_JSON_MSG_IDDefault=4&referralCode=APTGETX)
-->
