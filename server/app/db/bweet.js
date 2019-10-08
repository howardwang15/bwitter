const { admin, firebase } = require('./setup');
const db = admin.firestore();

const findBweetById = id => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await db.collection('bweet').doc(id).get();
            resolve(doc.data());
        } catch(e) {
            reject(e);
        }
    })
};

const findAllBweets = () => {
    return new Promise(async (resolve, reject) => {
        const getDataFromDoc = (doc) => {
            return doc.get().then(doc => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            });
        };

        try {
            const collection = db.collection('bweet');
            const documents = await collection.listDocuments();
            const promises = documents.map(getDataFromDoc);
        
            const data = await Promise.all(promises);
            resolve(data);
        } catch(e) {
            reject(e);
        }
    });
};

const findBweetByHandle = handle => {
    return new Promise(async (resolve, reject) => {
        const getDataFromQueryDocuments = (doc) => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        };

        try {
            const snapshots = await db.collection('bweet').where('user.handle', '==', handle).get();
            const data = snapshots.docs.map(getDataFromQueryDocuments);
            resolve(data);
        } catch(e) {
            reject(e);
        }
    });
}

module.exports = {
    findBweetById,
    findAllBweets,
    findBweetByHandle
};
