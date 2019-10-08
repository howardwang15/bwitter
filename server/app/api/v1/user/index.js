const express = require('express');
const router = express.Router();
const userModule = require('../../../db').userModule;


router.get('/:id?', (async (req, res, next) => {
    try {
        if (req.params.id) {
            const user = await userModule.findUserById(req.params.id);
            if (!user)
                return res.json({ user: null, error: null });
            else
                return res.json({ user, error: null });
        } else {
            const users = await userModule.findAllUsers();
            return res.json({ user: users, error: null });
        }
    } catch(e) {
        return res.json({ user: null, error: e });
    }
}));


router.get('/handle/:handle', (async (req, res, next) => {
    try {
        const user = await userModule.findUserByHandle(req.params.handle);
        return res.json({ user, error: null });
    } catch(e) {
        return res.json({ user: null, error: e });
    }
}));


router.post('/register', (async (req, res, next) => {
    const userInfo = req.body.register;
    try {
        const user = await userModule.create(userInfo);
        return res.json({ error: null, user });
    } catch (e) {
        return res.json({ error: e });
    }
}));


router.post('/login', (async (req, res, next) => {
    const userInfo = req.body.login;
    try {
        const user = await userModule.login(userInfo);
        return res.json({ user, error: null });
    } catch(e) {
        return res.json({ error: e });
    }
}));

module.exports = { router };
