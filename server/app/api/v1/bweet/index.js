const express = require('express');
const router = express.Router();

const admin = require('firebase-admin');
const serviceKey = require('./../../../../firebase-admin-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceKey)
});

const db = admin.firestore();


router.route('/:id?').get(async (req, res, next) => {
    if (req.params.id) {
        const doc = await db.collection('bweet').doc(req.params.id).get();
        const bweet = doc.data();

        if (!bweet) {
            return res.json({ data: []});
        } else {
            return res.json({ data: [bweet] });
        }

    } else {
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
    }
});

module.exports = { router };
