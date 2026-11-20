const express = require('express');
const path = require('node:path');
const { readFile } = require('node:fs/promises');

const routerUser = express.Router();
const profilePath = path.join(__dirname, '..', 'user.json');

routerUser.get('/profile', (req, res, next) => {
  res.sendFile(profilePath, (error) => {
    if (error) next(error);
  });
});

routerUser.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    const user = JSON.parse(await readFile(profilePath, 'utf8'));

    if (username !== user.username) {
      return res.json({ status: false, message: 'User Name is invalid' });
    }

    if (password !== user.password) {
      return res.json({ status: false, message: 'Password is invalid' });
    }

    res.json({ status: true, message: 'User Is valid' });
  } catch (error) {
    next(error);
  }
});

routerUser.get('/logout/:username', (req, res) => {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const username = req.params.username.replace(/[&<>"']/g, (character) => entities[character]);
  res.type('html').send(`<b>${username} successfully logged out.</b>`);
});

module.exports = routerUser;
