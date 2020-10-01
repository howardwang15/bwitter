const express = require('express');
const { User } = require('../../../db');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    if (req.params.id) {
      const user = await User.findById(req.params.id);
      if (user === null) {
        return res.json({ error: 'User not found!' });
      }
      return res.json({ user: user.getPublicProfile() });
    }
    const users = await User.findAll();
    return res.json({ error: null, user: users.map((user) => user.getPublicProfile()) });
  } catch (e) {
    return res.json({ error: e.toString() });
  }
});

router.get('/handle/:handle', async (req, res) => {
  try {
    const user = await User.findByHandle(req.params.handle);
    return res.json({ error: null, user: user.getPublicProfile() });
  } catch (e) {
    return res.json({ error: e.toString() });
  }
});

router.post('/register', async (req, res) => {
  const userInfo = req.body.register;
  try {
    const user = await User.register(userInfo);
    const token = await user.createToken();
    const publicProfile = user.getPublicProfile();
    publicProfile.token = token;
    return res.json({ error: null, publicProfile });
  } catch (e) {
    return res.json({ error: e.toString() });
  }
});

router.post('/login', async (req, res) => {
  const userInfo = req.body.login;
  try {
    const user = await User.login(userInfo);
    const token = await user.createToken();
    const publicProfile = user.getPublicProfile();
    publicProfile.token = token;
    return res.json({ error: null, publicProfile });
  } catch (e) {
    return res.json({ error: e.toString() });
  }
});

router.post('/logout', async (req, res) => {
  try {
    await User.logout();
    return res.json({ error: null });
  } catch (e) {
    return res.json({ error: e.toString() });
  }
});

module.exports = { router };
