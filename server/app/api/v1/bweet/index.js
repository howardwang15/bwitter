const express = require('express');
const router = express.Router();

const admin = require('firebase-admin');
const serviceKey = require('./../../../../firebase-admin-key.json');

const bweetHelper = require('../../../helpers/bweet');

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
        const collection = db.collection('bweet');
        const documents = await collection.listDocuments();
        const promises = documents.map(bweetHelper.getDataFromDoc);
    
        const data = await Promise.all(promises);
    
        return res.json({ data });
    }
});

router.route('/user/:handle').get(async (req, res, next) => {
    const handle = req.params.handle;
    const snapshots = await db.collection('bweet').where('user.handle', '==', handle).get();
    const data = snapshots.docs.map(bweetHelper.getDataFromQueryDocuments);
    return res.json({ data });
});

module.exports = { router };
