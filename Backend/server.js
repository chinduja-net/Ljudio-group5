const db = require('./database.js');
const express = require('express');
const app = express();
app.use(express.json());

const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

const { hashPassword, comparePassword } = require('./utility/utils');
const { getUserLoginInfo } = require('./database');

// Get all users
app.get('/api/users', (req, res) => {
  res.json(db.getAllUsers());
});

// Create Account

app.post('/api/signup', async (req, res) => {
  let account = req.body;
  account.uid = nanoid();
  console.log('Account info before hashing', account);
  account.password = await hashPassword(account.password);
  console.log('Account info after hashing', account);
  let insert = db.createAccount(account);
  account.id = insert.lastInsertRowid;
  res.json(account);
});

// Login to account
app.post('/api/login', async (req, res) => {
  let loginCredentials = req.body;
  const user = getUserLoginInfo(loginCredentials);
  console.log('Log user object', user);
  // Break out password prop of userObj
  let userHashPass = user[0].password;
  console.log(userHashPass);
  let compareHashPass = await comparePassword(
    loginCredentials.password,
    userHashPass
  );
  console.log(compareHashPass);
  let result = { success: false, token: null };
  if (compareHashPass) {
    result.success = true;
  }
  if (result.success) {
    const token = jwt.sign({ uid: user.uid }, 'a1b1c1', {
      expiresIn: 600, //Går ut om 10 minuter
    });
    result.token = token;
    console.log('JWT Token Sign', token);
  }
  res.json(result);
});

// Login status
app.get('/api/loggedin', (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  let result = { loggedIn: false };

  if (token) {
    const tokenVerified = jwt.verify(token, 'a1b1c1');

    console.log('JWT Verify:', tokenVerified);

    if (tokenVerified) {
      result.loggedIn = true;
    }
  }
  res.json(result);
});

// Get all playlists from account
app.get('/api/playlists', (req, res) => {
  res.json(db.getAllPlaylists());
});

// Create a playlist

// Remove a playlist

//Share a playlist

app.listen(4000, () => console.log('Server started on Port 4000'));
