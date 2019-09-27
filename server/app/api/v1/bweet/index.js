const express = require('express');
const router = express.Router();

const admin = require('firebase-admin');
const serviceKey = require('./../../../../firebase-admin-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceKey)
});

const db = admin.firestore();


router.route('/').get(async (req, res, next) => {

    const getDataFromDoc = (doc) => {
        return doc.get().then(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        });
    };

    const collection = db.collection('bweet');
    const documents = await collection.listDocuments();
    const promises = documents.map(getDataFromDoc);

    const data = await Promise.all(promises);

    return res.json({ data });
});

module.exports = { router };
