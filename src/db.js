import env from "./env";
let creds = {
  projectId: env.PROJECT_ID,
  privateKey: env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: env.CLIENT_EMAIL,
};
let db_url = env.DB_URL;

import Firebase from "./utils/firebase";
const db = new Firebase(creds, db_url);

db.initialize();

export default db;