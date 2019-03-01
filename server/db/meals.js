const connection = require('./index')

module.exports = {
    userMeals,
    newMeal,
    latestMeal,
    allMealMoods
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
    .orderBy('time', 'desc')
    .first()
}

function allMealMoods (id, db = connection) {
    return db('moods')
    .join('meals', 'meals.id', 'meal_id')
    .where('moods.meal_id', id)
    .select('moods.id', 'moods.emotion_id', 'moods.meal_id', 'moods.note', 'moods.time')
  }