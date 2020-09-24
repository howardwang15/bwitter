/* eslint-disable import/no-unresolved */
const admin = require("firebase-admin");
const serviceKey = require("../../firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceKey),
});

module.exports = {
  admin,
};
