const { admin } = require('./setup');
const db = admin.firestore();

const findBweetById = id => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await db.collection('bweet').doc(id).get();
            resolve(doc);
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
                if (!data) {
                    return null;
                }
                data.id = doc.id;
                return data;
            });
        };

        try {
            const collection = db.collection('bweet');
            const documents = await collection.listDocuments();
            const promises = documents.map(getDataFromDoc);
            const data = await Promise.all(promises);
            const filtered = data.filter(bweet => bweet !== null);
            resolve(filtered);
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
};

const addBweet = bweet => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await db.collection('bweet').add(bweet);
            resolve(doc);
        } catch(e) {
            reject(e);
        }
    });
}

const deleteBweet = id => {
    return new Promise(async (resolve, reject) => {
        const bweet = await findBweetById(id);
        try {
            bweet.ref.delete();
            resolve(true);
        } catch(e) {
            reject({ message: e.toString(), status: 400 });
        }
    });
}

module.exports = {
    findBweetById,
    findAllBweets,
    findBweetByHandle,
    addBweet,
    deleteBweet
};
