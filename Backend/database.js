const sqlite = require('better-sqlite3');
const { comparePassword } = require('./utility/utils');

const conn = sqlite('database.db');

function all(query, params = {}) {
  const stmt = conn.prepare(query);
  return stmt.all(params);
}
function run(query, params = {}) {
  // prepare statement
  const stmt = conn.prepare(query);
  return stmt.run(params);
}

// A quick get all users for testing purposes
function getAllUsers() {
  let users = all(`SELECT userName, password FROM users`);
  return users;
}

// Get user playlist based on userId
function getUserPlaylistsById(id) {
  let query = `SELECT userName, playlistName, songName
  FROM users, songs, playlists, playlist_track_user
  WHERE users.id = :id
  AND playlist_track_user.userId = users.id
  AND  playlist_track_user.playlistId = playlists.id
  AND  playlist_track_user.songId = songs.id `;
  return all(query, id);
}

// Get all playlist
function getAllPlaylists() {
  let playlists = all(`SELECT userName,playlistName
      FROM playlists, users, playlist_track_user
      WHERE playlists.id = playlist_track_user.playlistId
      AND users.id = playlist_track_user.userId
      ORDER BY userName`);
  return playlists;
}

// Create Account
function createAccount(account) {
  let query =
    'INSERT INTO users(userName, password, uid) VALUES(:userName,:password,:uid)';
  return run(query, account);
}

//login Account
function getUserLoginInfo(loginCredentials) {
  let query = `SELECT userName, password FROM  users WHERE  (userName = :userName)`;
  return all(query, loginCredentials);
}

exports.getAllUsers = getAllUsers;
exports.getAllPlaylists = getAllPlaylists;
exports.createAccount = createAccount;
exports.getUserLoginInfo = getUserLoginInfo;
exports.getUserPlaylistsById = getUserPlaylistsById;
