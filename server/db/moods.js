const connection = require('./index')

module.exports = {
  latestMood,
  addMood,
  editMood,
  deleteMood
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

function editMood (mood, db = connection) {
  return db('moods')
    .where('id', mood.id)
    .update(mood)
}

function deleteMood (moodId, db = connection) {
  return db('moods')
    .where('id', moodId)
    .delete()
}
