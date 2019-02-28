const connection = require('./index')

module.exports = {
    userMeals,
    newMeal,
    latestMeal
  }

function userMeals (id, db = connection) {
    return db('meals')
    .where('user_id', id)
}

function newMeal (meal, db = connection) {
    return db('meals')
    .insert(meal)
}

function latestMeal (id, db = connection) {
    return db('meals')
    .where('user_id', id)
    .orderBy('time')
    .first()
}