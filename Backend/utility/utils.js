const bcrypt = require('bcrypt');

// async hashPassword(password) function
async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword);
  return hashedPassword;
}

// async comparePassword(password, hash) function
async function comparePassword(password, hash) {
  const isMatch = await bcrypt.compare(password, hash);
  console.log('log inside comparePass in utils', isMatch);
  return isMatch;
}
//* refreshToken(userId) function

//* validateBody(body) function

module.exports = { hashPassword, comparePassword };
