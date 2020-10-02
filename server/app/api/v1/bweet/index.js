const express = require('express');
const { Bweet } = require('../../../db');

const router = express.Router();
const { isUserAuthenticated } = require('../../../middleware').auth;

router.use(isUserAuthenticated);

router.route('/:id?').get(async (req, res) => {
  try {
    if (req.params.id) {
      const bweet = await Bweet.findById(req.params.id);
      if (!bweet) return res.status(200).json({ data: null });
      return res.status(200).json({ data: bweet });
    }
    const data = await Bweet.findAll();
    return res.status(200).json({ error: null, data });
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
});

router.route('/user/:handle').get(async (req, res) => {
  try {
    const { handle } = req.params;
    const data = await Bweet.findByUserHandle(handle);
    return res.status(200).json({ error: null, data });
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
});

router.route('/add').post(async (req, res) => {
  try {
    const { text, userId } = req.body.bweet;
    const timestamp = new Date().toString();
    const document = {
      likes: 0,
      text,
      timestamp,
      userId,
    };
    const data = await Bweet.add(document);
    return res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
});

router.route('/delete').delete(async (req, res) => {
  const bweetId = req.body.id;
  try {
    await Bweet.delete(bweetId);
    return res.status(200).json({ error: null });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

module.exports = { router };
