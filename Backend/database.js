const sqlite = require('better-sqlite3');

const conn = sqlite('database.db');

const {nanoid} = require('nanoid');
const jwt = require('jsonwebtoken');


function all(query, params = {}) {
  const stmt = conn.prepare(query);
  return stmt.all(params);
}
function run(query, params = {}) {
  // prepare statement
  const stmt = conn.prepare(query)
  return stmt.run(params)
}

module.exports = {
  getAllUsers() {
    let users = all(`SELECT userName, password FROM users`);
    return users;
  },

  createAccount(account){

    const query = "INSERT INTO users(userName, password) VALUES(:userName, :password)"
    return run(query,account)
    
  }
};

 