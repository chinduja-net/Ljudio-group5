const db = require('./database.js');
const express = require('express');
const app = express();
app.use(express.json());

const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

// Get all users
app.get('/api/users', (req, res) => {
  res.json(db.getAllUsers());
});

// Create Account

app.post('/api/signup', (req, res) => {
  let account = req.body;
  console.log(account);
  let insert = db.createAccount(account);
  account.id = insert.lastInsertRowid;
  account.uid = nanoid()
  res.json(account);
});

// Login to account
app.post('/api/login', (req, res) => {
  let loginCredentials = req.body;
  
  let checkCredential = db.checkCredentials(loginCredentials);
  
    const token = jwt.sign({ userName : checkCredential.userName }, 'a1b1c1', {
      expiresIn: 600 //Går ut om 10 minuter 
    });
    checkCredential.token = token;

  console.log(checkCredential);
  res.json(checkCredential)

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

})


// Get all playlists from account
app.get('/api/playlists', (req, res) => {
  res.json(db.getAllPlaylists());
});

// Create a playlist

// Remove a playlist

//Share a playlist

app.listen(4000, () => console.log('Server started on Port 4000'));
