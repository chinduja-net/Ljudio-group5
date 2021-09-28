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
  let users = all(`SELECT userName, password, id, uid FROM users`);
  return users;
}

// Get user playlist based on userId
function getUserPlaylistsById(userIdObj) {
  let query = `SELECT playlistName
  FROM users, playlists, playlist_track_user
  WHERE users.id = :userId
  AND playlist_track_user.userId = users.id
  AND playlist_track_user.playlistId = playlists.id
  GROUP BY playlistName`;
  return all(query, userIdObj);
}

// Get all playlist
function getAllPlaylists() {
  let playlists = all(`SELECT userName,playlistName
      FROM playlists, users, playlist_track_user
      WHERE playlists.id = playlist_track_user.playlistId
      AND users.id = playlist_track_user.userId
      GROUP BY playlistName
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
  let query = `SELECT id,userName, password FROM  users WHERE  (userName = :userName)`;
  return all(query, loginCredentials);
}

// Creates playlist into playlists table
function createPlaylist(playlist) {
  let query = `INSERT INTO playlists (playlistName)
  VALUES (:playlistName)`;
  return run(query, playlist);
}

// Creates the connection between the user currently logged and a created playlist.
function createPlaylistUserConnection(relationData) {
  let query = `INSERT INTO playlist_track_user (playlistId, userId)
  VALUES (:playlistId, :userId)`;
  return run(query, relationData);
}

exports.getAllUsers = getAllUsers;
exports.getAllPlaylists = getAllPlaylists;
exports.createAccount = createAccount;
exports.getUserLoginInfo = getUserLoginInfo;
exports.getUserPlaylistsById = getUserPlaylistsById;
exports.createPlaylist = createPlaylist;
exports.createPlaylistUserConnection = createPlaylistUserConnection;
