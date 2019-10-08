const admin = require('firebase-admin');
const firebase = require('firebase');
const serviceKey = require('../../firebase-admin-key.json'); 
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
    databaseUrl: `https://${process.env.PROJECT_ID}.firebaseio.com`,
    projectId: process.env.PROJECT_ID,
    appId: process.env.APP_ID
};

admin.initializeApp({
    credential: admin.credential.cert(serviceKey)
});

firebase.initializeApp(firebaseConfig);

module.exports = {
    admin,
    firebase
};
