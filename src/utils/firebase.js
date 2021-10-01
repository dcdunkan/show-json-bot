// One file to manage all the firebase (database) related things.
import admin from "firebase-admin";

class Firebase {
  // credential - Credentials generated from Firebase's Console > Project > Project Settings > Service Accounts.
  // databaseURL - URL of the firebase database.
  constructor(credential, databaseURL) {
    this.credential = credential;
    this.databaseURL = databaseURL;
  }

  // Initialize the connection to the database using credentials and database url.
  initialize = async () => {
    admin.initializeApp({
      credential: admin.credential.cert(this.credential),
      databaseURL: this.databaseURL,
    });
    this.setupDb();
  };

  /**
   * BASIC FUNCTIONS
   * get, set, update, and _delete functions. But, I dont think any of it is a good way to do these things.
   * Maybe, I will make it better later. (*If* I can do it in a more perfect way.)
   * 
   * ref, parent_ref: Path to the data to be get, written, updated, or deleted;
   * data: Its the data to be written or updated;
   */

  get = async (ref) =>
    admin
      .database()
      .ref(ref)
      .once("value")
      .then((data) => data.val())
      .catch((err) => console.log("Firebase GET error has occurred: ", err));

  set = (parent_ref, data) =>
    admin
      .database()
      .ref(parent_ref)
      .set(data)
      .catch((error) => console.log(error));

  update = (ref, data) => admin.database().ref(ref).update(data);

  _delete = (ref) => this.set(ref, {});

  /**
   * Some custom functions which are designed to work with this software (type: telegram-bot);
   * user_id: ID of the user, to determine the path of the user data, since the database paths are like that: /users/{user_id}/
   * username: Username of the user.
   */
  getUser = (user_id) => this.get(`users/${user_id}`);
  getUsers = () => this.get("users");
  getUsersCount = async () => {
    const users = await this.getUsers();
    return Object.keys(users).length - 1;
  };
  getJsonShowedCount = () => this.get("data/json_showed");
  getJsonShowedCountForUser = (user_id) =>
    this.get(`users/${user_id}/json_showed`);
  getAll = () => this.get("/");

  // Check existence of a user data in the database. (see this.writeUser() for related)
  existing = async (user_id) => {
    const users = await this.get("users");
    if (users === null) return null;
    if (users && user_id in users) return true;
  };

  // writes a user. (see this.existing() for checking existence)
  writeUser = (user_id, username) => {
    this.set(`users/${user_id}`, {
      user_id: user_id,
      username: username,
      time_joined: new Date(),
      time_joined_unix: Date.now(),
      json_showed: 0,
    });
  };

  // Used in this.incrementTotalJsonShowed(); could be useful later also. (idk)
  // base_path: It is the parent path to the data to be incremented.
  // key: It is the key of the data to be incremented.
  increment = async (base_path, key) => {
    let num = await this.get(`${base_path}/${key}`);
    this.update(base_path, { [key]: num + 1 });
  };

  // Increment the count of JSON data showed. In both user and total db.
  incrementTotalJsonShowed = async (user_id) => {
    this.increment("data", "json_showed");
    this.increment(`users/${user_id}`, "json_showed");
  };

  // creates some sample data to db root if it is empty.
  setupDb = () => {
    this.get("/")
      .then(async (data) => {
        if (data !== null) return;
        await this.set("/", {
          data: { json_showed: 0 },
          users: { blob: sample_usr },
        });
        console.log(
          "/root/ of the database was empty. Added some sample data."
        );
        this.getAll().then((data) => console.log("Updated root", data));
      })
      .catch((error) => console.log(error));
  };
}

export default Firebase;