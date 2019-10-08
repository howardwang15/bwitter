const express = require('express');
const router = express.Router();
const { bweetModule } = require('../../../db');

const bweetHelper = require('../../../helpers/bweet');

router.route('/:id?').get(async (req, res, next) => {
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

router.route('/user/:handle').get(async (req, res, next) => {
    const handle = req.params.handle;
    const data = await bweetModule.findBweetByHandle(handle);
    return res.json({ data });
});

module.exports = { router };
