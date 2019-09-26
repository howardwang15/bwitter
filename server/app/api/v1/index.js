const express = require('express');
const router = express.Router();

router.use('/bweet', require('./bweet').router);

module.exports = { router };