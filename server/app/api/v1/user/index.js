const express = require('express');
const router = express.Router();


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

}));

module.exports = { router };
