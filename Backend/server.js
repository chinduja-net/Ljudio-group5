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

//get user by id
app.get('/api/user/:id', (req,res) => {
  let id = +(req.params.id)
  console.log(id);
  res.json(db.getUserById(id))
})
// Create Account

app.post('/api/signup', (req, res) => {
  let account = req.body;
  account.uid = nanoid();
  console.log(account);
  let insert = db.createAccount(account);
  account.id = insert.lastInsertRowid;
  res.json(account);
});

// Login to account
app.post('/api/login', (req, res) => {

  let loginCredentials = req.body;
  let result = { success: false , token : null };
  let checkCredential = db.checkCredentials(loginCredentials);
  console.log(checkCredential);
  if (checkCredential.length != 0) {
    const token = jwt.sign({ uid: checkCredential.uid }, 'a1b1c1', {
      expiresIn: 600 //Går ut om 10 minuter 
    });
    result.success = true;
    result.token = token;
    console.log("JWT Token Sign", token);

  }
  res.json(result)

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
