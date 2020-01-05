const express = require('express');
const router = express.Router();
const userModule = require('../../../db').userModule;


router.get('/:id?', (async (req, res) => {
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


router.get('/handle/:handle', (async (req, res) => {
    try {
        const user = await userModule.findUserByHandle(req.params.handle);
        return res.json({ user, error: null });
    } catch(e) {
        return res.json({ user: null, error: e });
    }
}));


router.post('/register', (async (req, res) => {
    const userInfo = req.body.register;
    try {
        const user = await userModule.create(userInfo);
        const token = await userModule.createToken(user);
        return res.json({ error: null, token });
    } catch (e) {
        return res.status(e.status).json({ error: e.message });
    }
}));


router.post('/login', (async (req, res) => {
    const userInfo = req.body.login;
    try {
        const user = await userModule.login(userInfo);
        const token = await userModule.createToken(user);
        return res.json({ token, error: null });
    } catch(e) {
        return res.status(e.status).json({ error: e.message });
    }
}));


router.post('/logout', (async (req, res) => {
    try {
        const user = await userModule.logout();
    } catch(e) {
        return res.json({ error: e });
    }
}));


module.exports = { router };
