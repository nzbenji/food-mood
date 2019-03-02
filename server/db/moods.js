const connection = require('./index')

module.exports = {
  latestMood,
  addMood
}

function latestMood (userId, db = connection) {
  return db('moods')
    .join('meals', 'meals.id', 'meal_id')
    .where('meals.user_id', userId)
    .orderBy('moods.time', 'desc')
    .first()
}
function addMood (mood, db = connection) {
  return db('moods')
    .insert(mood)
}
