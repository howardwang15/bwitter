const { admin } = require('./setup');

const db = admin.firestore();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

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


const findUserByEmail = email => {
    return new Promise(async (resolve, reject) => {
        const getDataFromQueryDocuments = (doc) => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        }

        try {
            const snapshots = await db.collection('user').where('email', '==', email).get();
            const data = snapshots.docs.map(getDataFromQueryDocuments);
            resolve(data);
        } catch(e) {
            reject(e);
        }
    });
}


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


// create a user
const create = user => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingUserByHandle = await findUserByHandle(user.handle);
            if (existingUserByHandle.length) {
                return reject({ message: 'The user handle entered already exists and is in use.', status: 400 });
            }

            const existingUserByEmail = await findUserByEmail(user.email);
            if (existingUserByEmail.length) {
                return reject({ message: 'The email entered already exists and is in use.', status: 400 });
            }

            bcrypt.hash(user.password, saltRounds, async (err, hash) => {
                if (err) {
                    return reject({ message: err.message, status: 500 });
                } else {
                    const hashedUser = {
                        email: user.email,
                        password: hash,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        handle: user.handle,
                        picture: user.picture || ""
                    };
                    await db.collection('user').add(hashedUser);
                    return resolve(hashedUser);
                }
            });
        } catch(e) {
            reject({ message: e.toString(), status: 500 });
        }
    });
};


const logout = user => {
    return new Promise(async (resolve, reject) => {
        try {
            firebase.auth().signOut().then(() => console.log('signed out'));
        } catch(e) {
            reject(e);
        }
    });
};

const createToken = hashedUser => {
    return new Promise(async (resolve, reject) => {
        // keep user signed in for 3600
        jwt.sign(hashedUser, process.env.APP_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) {
                reject({ message: err.message, status: 500 });
            } else {
                resolve(token);
            }
        })
    });
}


module.exports = {
    findUserById,
    findUserByHandle,
    findAllUsers,
    login,
    create,
    logout,
    createToken
};
