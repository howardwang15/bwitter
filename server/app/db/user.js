const { admin, firebase } = require('./setup');

const db = admin.firestore();

const findUserById = id => {
    return new Promise(async (resolve, reject) => {
        try {
            const doc = await db.collection('user').doc(id).get();
            resolve(doc.data());
        } catch(e) {
            reject(e);
        }
    });
};


const findAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        const getDataFromDoc = (doc) => {
            return doc.get().then(doc => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            });
        };
        
        try {
            const collection = db.collection('user');
            const documents = await collection.listDocuments();
            const promises = documents.map(getDataFromDoc);
            const data = await Promise.all(promises);
            resolve(data);
        } catch(e) {
            reject(e);
        }
    });
};


module.exports = {
    findUserById,
    findAllUsers
};
