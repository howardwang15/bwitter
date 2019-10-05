const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


router.post('/register', (async (req, res, next) => {
    const admin = req.app.get('admin');
    const auth = admin.auth();
    const db = admin.firestore();
    const user = req.body.register;
    try {
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
        return res.json({ error: null, user: userData });

    } catch (e) {
        return res.json({ error: e.errorInfo.message });
    }
}));


router.post('/login', (async (req, res, next) => {
    const user = req.body.login;
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
            return res.json({ error: errorMessage });
        }

        const admin = req.app.get('admin');
        const db = admin.firestore();
        const document = await db.collection('user').doc(payload.localId).get();
        const data = document.data();
        data.token = payload.idToken;
        return res.json({ error: null, user: data });
    } catch (e) {
        return res.json({ error: e });
    }
}));

module.exports = { router };
