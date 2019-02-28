const connection = require('./index')
const {generateHash} = require('../auth/hash')

module.exports = {
  registerUser,
  getUser
}

function registerUser (user, db = connection) {
  return generateHash(user.password)
    .then(hash => {
      const {username, email} = user
      return db('users').insert({
        username,
        email,
        hash
      })
    })
}

function getUser (user, db = connection) {
  return db('users')
    .where({
      username: user.username
    })
    .first()
}
