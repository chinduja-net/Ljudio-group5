const db = require('./database.js');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('../Frontend'))

const { nanoid } = require('nanoid');
const { createAccount } = require('./database.js');



// Get all users
app.get('/api/users', (req, res) => {
  res.json(db.getAllUsers());
});

// Create Account

app.post('/api/signup', (req, res) => {

  let account = req.body;
  let insert = db.createAccount(account);
  account.id = insert.lastInsertRowid;
  res.json(account)


})

// Login to account
app.post('/api/login', (req, res) => {

  console.log('login..')

})

// Get all playlists from account

// Create a playlist

// Remove a playlist

//Share a playlist

app.listen(4000, () => console.log('Server started on Port 4000'));
