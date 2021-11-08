import env from "./env";
import DetaDB from "./helpers/deta";

const db = new DetaDB();

if (env.DB_ENABLE === true) {
  if (process.env.DETA_KEY === undefined) {
    console.error(
      "Set DETA_KEY in environmental variables to enable Database."
    );
  } else {
    db.project_key = process.env.DETA_KEY;
  }
}

export default db;
