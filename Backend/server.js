const db = require('./database.js');
const express = require('express');
const app = express();

app.use(express.json());

// Get all users
app.get('/api/users', (req, res) => {
  res.json(db.getAllUsers());
});

// Create Account

// Login to account

// Get all playlists from account
app.get('/api/playlists', (req, res) => {
  res.json(db.getAllPlaylists());
});

// Create a playlist

// Remove a playlist

//* Share a playlist
app.listen(4000, () => console.log('Server started on Port 4000'));
