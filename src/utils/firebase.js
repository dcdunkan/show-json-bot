// One file to manage all the firebase (database) related things.
import admin from "firebase-admin";

class Firebase {
  constructor(credential, databaseURL) {
    this.credential = credential;
    this.databaseURL = databaseURL;
  }

  initialize = async () => {
    admin.initializeApp({
      credential: admin.credential.cert(this.credential),
      databaseURL: this.databaseURL,
    });
    this.setupDb();
  };

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

  getUser = (user_id) => this.get(`users/${user_id}`);
  getUsers = () => this.get("users");
  getUsersCount = () => Object.keys(this.getUsers()).length;
  getJsonShowedCount = () => this.get("data/json_showed")
  getJsonShowedCountForUser = (user_id) => this.get(`users/${user_id}/json_showed`);
  getAll = () => this.get("/");

  existing = async (user_id) => {
    const users = await this.get("users");
    if (users === null) return null;
    if (users & (user_id in users)) return true;
  };

  writeUser = (user_id, username) => {
    this.set(`users/${user_id}`, {
      user_id: user_id,
      username: username,
      time_joined: new Date(),
      time_joined_unix: Date.now(),
      json_showed: 0,
    });
  };

  increment = async (base_path, key) => {
    let num = await this.get(`${base_path}/${key}`);
    this.update(base_path, { [key]: num + 1 });
  };

  incrementTotalJsonShowed = async (user_id) => {
    this.increment("data", "json_showed");
    this.increment(`users/${user_id}`, "json_showed");
  };

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
