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

function newMeal (meals, db = connection) {
    newMeal = {
        title: meals.title,
        time: meals.time
    }
    return db('meals')
    .insert(newMeal)
}

function latestMeal (id, db = connection) {
    return db('meals')
    .where('user_id', id)
    .orderBy('time')
    .first()
}