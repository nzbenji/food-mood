const connection = require('./index')

module.exports = {
  getEmotions
}

function getEmotions (db = connection) {
  return db('emotions')
}
