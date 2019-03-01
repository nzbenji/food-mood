const connection = require('./index')

module.exports = {
    latestMood
  }

function latestMood (userId, db = connection) {
    return db('moods')
    .join('meals', 'meals.id', 'meal_id')
    .where('meals.user_id', userId)
    .orderBy('moods.time', 'desc')
    .first()
}




