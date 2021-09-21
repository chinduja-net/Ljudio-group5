const sqlite = require('better-sqlite3');

const conn = sqlite('database.db');

function all(query, params = {}) {
  const stmt = conn.prepare(query);
  return stmt.all(params);
}

module.exports = {
  getAllUsers() {
    let users = all(`SELECT userName, password FROM users`);
    return users;
  },
};
