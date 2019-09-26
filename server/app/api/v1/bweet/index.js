const express = require('express');
const router = express.Router();

router.route('/').get((req, res, next) => {
    const bweets = [
        {
            user: {
                firstName: 'Howard',
                lastName: 'Wang',
                handle: 'howardwang15',
                picture: 'https://tinyurl.com/y4ea26gh'
            },
            text: 'This is my final Bweet',
            timestamp: new Date(),
            id: 'somehash',
            liked: true,
            likes: 1
        },
        {
            user: {
                firstName: 'Howard',
                lastName: 'Wang',
                handle: 'howardwang15',
                picture: 'https://tinyurl.com/y4ea26gh'
            },
            text: 'Hello Bwitter! Seems like I\'m the first one here...',
            timestamp: new Date(),
            id: 'anotherhash',
            liked: false,
            likes: 0
        }
    ];

    return res.json({ bweets });
});

module.exports = { router };
