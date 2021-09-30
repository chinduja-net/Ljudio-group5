const express = require('express');
const app = express();
app.use(express.json());

const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

const { hashPassword, comparePassword } = require('./utility/utils');
const {
  getUserLoginInfo,
  createAccount,
  getUserPlaylistsById,
  getAllUsers,
  getAllPlaylists,
  createPlaylist,
  createPlaylistUserConnection,
  addSongToTable,
  addSongToPlaylistAndUser,
  getSongsInPlaylist,
} = require('./database');

// Get all users
app.get('/api/users', (req, res) => {
  res.json(getAllUsers());
});

// Get all of current users playlists
//*(songs not included)
app.get('/api/playlistsByUserId', async (req, res) => {
  // Get token and decode it.
  const token = req.headers.authorization;
  let newToken = token.substring(7, token.length);
  let decoded = jwt.decode(newToken);
  console.log('Decoded token: ', decoded);

  let userIdObj = { userId: decoded.id };
  let userPlaylists = getUserPlaylistsById(userIdObj);
  res.json(userPlaylists);
});

// Create Account
app.post('/api/signup', async (req, res) => {
  let account = req.body;
  account.uid = nanoid();
  account.password = await hashPassword(account.password);
  let insert = createAccount(account);
  // Pass autoincrement id to res.
  account.id = insert.lastInsertRowid;
  res.json(account);
});

// Login to account
app.post('/api/login', async (req, res) => {
  let loginCredentials = req.body;
  const user = getUserLoginInfo(loginCredentials);
  let userHashPass = user[0].password;
  let compareHashPass = await comparePassword(
    loginCredentials.password,
    userHashPass
  );

  let result = { success: false, token: null };
  if (compareHashPass) {
    result.success = true;
  }
  if (result.success) {
    const token = jwt.sign({ id: user[0].id, uid: user[0].uid }, 'a1b1c1', {
      expiresIn: '24h',
    });
    result.token = token;
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
  let allPlaylists = getAllPlaylists();
  res.json(allPlaylists);
});

// Create a empty playlist connected to user
app.post('/api/createPlaylist', async (req, res) => {
  const token = req.headers.authorization;
  let newToken = token.substring(7, token.length);
  let decoded = jwt.decode(newToken);
  let playlist = req.body;

  let insert = createPlaylist(playlist);
  playlist.id = insert.lastInsertRowid;
  let relationData = { playlistId: playlist.id, userId: decoded.id };
  createPlaylistUserConnection(relationData);
  res.json(playlist);
});

// Add song to playlist
app.post('/api/addSongToPlaylist', async (req, res) => {
  let songAndPlaylist = req.body;
  const token = req.headers.authorization;
  let newToken = token.substring(7, token.length);
  let decoded = jwt.decode(newToken);
  let songInfo = songAndPlaylist.songInfo;
  let insert = addSongToTable(songInfo);

  songAndPlaylist.songInfo.id = insert.lastInsertRowid;
  let relationData = {
    playlistId: songAndPlaylist.playlistId,
    userId: decoded.id,
    songId: songAndPlaylist.songInfo.id,
  };

  addSongToPlaylistAndUser(relationData);
  res.json(songAndPlaylist);
});

// Get songs inside playlist
app.post('/api/getSongsInPlaylist', async (req, res) => {
  const token = req.headers.authorization;
  let newToken = token.substring(7, token.length);
  let decoded = jwt.decode(newToken);
  let playlist = req.body;
  // Create object which we use for the dynamic SQL queries
  let relationData = { playlistId: playlist.playlistId, userId: decoded.id };
  let result = getSongsInPlaylist(relationData);
  res.json(result);
});

app.listen(4000, () => console.log('Server started on Port 4000'));
