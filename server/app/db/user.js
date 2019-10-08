const { admin, firebase } = require('./setup');
const fetch = require('node-fetch');

const db = admin.firestore();
const auth = admin.auth();

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


const findUserByHandle = handle => {
    return new Promise(async (resolve, reject) => {
        const getDataFromQueryDocuments = (doc) => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        };

        try {
            const snapshots = await db.collection('user').where('handle', '==', handle).get();
            const data = snapshots.docs.map(getDataFromQueryDocuments);
            resolve(data);
        } catch(e) {
            reject(e);
        }
    });
};


const login = user => {
    return new Promise(async (resolve, reject) => {
        const firebaseLoginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`;
        try {
            const response = await fetch(firebaseLoginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...user, returnSecureToken: true })
            });
            const payload = await response.json();

            if (payload.error) {
                let errorMessage;
                switch (payload.error.message) {
                    case 'INVALID_PASSWORD':
                        errorMessage = 'Invalid password entered';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage = 'Invalid email entered';
                        break;
                    default:
                        errorMessage = payload.error.message;
                        break;
                }
                reject(errorMessage);
            }

            const document = await db.collection('user').doc(payload.localId).get();
            const data = document.data();
            data.token = payload.idToken;
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
};


const create = user => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingUserByHandle = await findUserByHandle(user.handle);
            if (existingUserByHandle.length) {
                reject({ message: 'The user handle entered already exists and is in use.' });
            }


            const userRecord = await auth.createUser({
                email: user.email,
                emailVerified: false,
                password: user.password,
                displayName: user.firstName + ' ' + user.lastName,
                disabled: false
            });

            const userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                handle: user.handle,
                picture: ''
            };


            db.collection('user').doc(userRecord.uid).set(userData);
            const token = await auth.createCustomToken(userRecord.uid);
            userData.token = token;
            resolve(userData);
        } catch(e) {
            reject(e);
        }
    });
}


module.exports = {
    findUserById,
    findUserByHandle,
    findAllUsers,
    login,
    create
};
