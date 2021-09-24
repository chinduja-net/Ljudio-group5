const sqlite = require('better-sqlite3');

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

module.exports = {
  // A quick get all users for testing purposes
  getAllUsers() {
    let users = all(`SELECT userName, password,id, uid FROM users`);
    return users;
  },

  //get one user by Id
  getUserById(id){
    let user = all(`SELECT id FROM users WHERE users.id = :id`);
    return all(user, id);
  },

  // Get all playlist
  getAllPlaylists() {
    let playlists = all(`SELECT userName,playlistName
      FROM playlists, users, playlist_track_user
      WHERE playlists.id = playlist_track_user.playlistId
      AND users.id = playlist_track_user.userId
      ORDER BY userName`);
    return playlists;
  },

  // Create Account
  createAccount(account) {
    const query =
      'INSERT INTO users(userName, password, uid) VALUES(:userName,:password,:uid)';
    return run(query, account);
  },

  //login Account
  checkCredentials(loginCredentials) {
    let query = (`SELECT userName, password FROM  users WHERE  (userName = :userName AND password = :password)`)
    return all(query, loginCredentials)
  }
};
