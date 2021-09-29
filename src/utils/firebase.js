// One file to manage all the firebase (database) related
// things. Simplified all the functions. Uses firebase-admin
// package.
const config = require('../config')
require('dotenv').config()
const admin = require("firebase-admin")

// Initialising the connection to database.
admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  databaseURL: config.firebase_dbURL
})

// GET type updates.
const get = (ref) => admin.database().ref(ref).once('value').then(data => data.val()).catch(err => console.log("Firebase GET error has occurred: ", err))
// SET type updates.
const set = (parent_ref, data) => admin.database().ref(parent_ref).set(data)
// UPDATE type updates.
const update = (ref, data) => admin.database().ref(ref).update(data)
// REMOVE/DELETE updates.
const _delete = (ref, data) => set(ref, {})

module.exports = {
  // Common
  get: get,
  update: update,
  set: set,
  _delete: _delete,
  
  // Get requests
  getUser: (uid) => get(`users/${uid}`),
  getUsers: (uid) => get("users"),
  getAll: (uid) => get("/"),
  getToken: (uid) => get(`users/${uid}/token`),
  getGithub: (uid) => get(`users/${uid}/github`),
  
  // Booleans
  isAuthorised: (uid) => get(`users/${uid}/authorised`),
  isReovoked: (uid) => get(`users/${uid}/revoked`),
  
}

const getUserToken = (uid) => get(`users/${uid}/token`);
// Checking connection.
getUserToken(824526817).then(data => console.log("Testing token:", data)).catch(err => console.log(err));

const getAll = () => get("/");
getAll().then(async (data) => {
  if (data !== null) return;
  await set("users", { "blob": "sample_user" })
  console.log("root of the database were empty. Added some sample data.");
  getAll().then((data) => console.log("Updated root", data))
}).catch((error) => console.log(error));

const getUsers = (uid) => get("users");
const exists = async (uid) => {
  const users = await getUsers();
  if (users === null) return null;
  if (users & uid in users) return true;
};

exists("u824526817").then((result) => {
  if (result) console.log("user_exists:", result);
}).catch((error) => {
  console.log(error);
});

const writeUser = (uid, username) => set(`users/${uid}`, { user_id: uid, username: username, github: { id: 3838, username: "dcd" }, total_gists: 55, authorised: false, revoked: false, settings: { check: "yup" } })
const deleteUserData = (uid) => set(`users/${uid}`, {});


/*
SAMPLE DATA
'824526817': {
  authorised: true,
  github: { id: 70066170, username: 'dcdunkan' },
  revoked: false,
  settings: {
    default_privacy: 1,
    quick_mode: 1,
    get_updates: true,
    send_backups: true
  },
  access_token: '7d4029f9dd9de7628cab36ff506b019109b7da51',
  user_id: 824526817,
  username: 'dcdunkan'
}*/