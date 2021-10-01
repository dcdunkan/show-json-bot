import env from "./env";
import Firebase from "./utils/firebase";

//  About these CREDENTIALS;
//  You can get these credentials by generating a private key in your firebase console > project settings > service accounts.
//   | GO here: https://console.firebase.google.com/u/1/project/showjsonbot/settings/serviceaccounts/adminsdk
//  which comes with all the data you need to setup this bot. Get values of PROJECT_ID, DATABASE_ID, PRIVATE_KEY, and CLIENT_ID,
//  and set them in the Environmental variables on key values, respectively.

let creds = {
  projectId: env.PROJECT_ID,
  privateKey: env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: env.CLIENT_EMAIL,
};
let db_url = env.DB_URL;

// Creating the database;
const db = new Firebase(creds, db_url);

// Initializing the connection to the database;
db.initialize();

export default db;