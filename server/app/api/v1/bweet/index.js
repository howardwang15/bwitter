const express = require('express');
const router = express.Router();
const { bweetModule } = require('../../../db');
const { isUserAuthenticated } = require('../../../middleware').auth;

router.use(isUserAuthenticated);

router.route('/:id?').get(async (req, res) => {
    if (req.params.id) {
        const bweet = await bweetModule.findBweetById(req.params.id);
        if (!bweet)
            return res.json({ data: null});
        else
            return res.json({ data: bweet });

    } else {
        const data = await bweetModule.findAllBweets();
        return res.json({ data });
    }
});

router.route('/user/:handle').get(async (req, res) => {
    const handle = req.params.handle;
    const data = await bweetModule.findBweetByHandle(handle);
    return res.json({ data });
});

router.route('/add').post(async (req, res) => {
    const { handle, firstName, lastName, picture } = req.user;
    const user = { handle, firstName, lastName, picture };
    const bweet = req.body.bweet;
    const timestamp = new Date().toString();
    const document = {
        liked: false,
        likes: 0,
        text: bweet,
        timestamp,
        user
    };
    const data = await bweetModule.addBweet(document);
    return res.json({ data });
});

router.route('/delete').post(async (req, res) => {
    const bweetId = req.body.id;
    try {
        await bweetModule.deleteBweet(bweetId);
        return res.status(200).json({});
    } catch(e) {
        return res.status(e.status).json({ error: e.message });
    }
});

module.exports = { router };
