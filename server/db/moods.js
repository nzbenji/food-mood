const connection = require('./index')

module.exports = {
    latestMood
  }

function latestMood (id, db = connection) {
    return db('moods')
    .join('meals', 'meals.id', 'meal_id')
    .where('meals.user_id', id)
    .orderBy('time', 'desc')
    .first()
}



