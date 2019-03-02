const connection = require('./index')

module.exports = {
  userMeals,
  newMeal,
  latestMeal,
  allMealMoods,
  allUserMealsAndMoods
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
    .select('moods.id', 'moods.emotion_id', 'moods.meal_id', 'moods.notes', 'moods.time')
}

function allUserMealsAndMoods (userId, db = connection) {
  return db('moods')
    .join('meals', 'meals.id', 'meal_id')
    .where('meals.user_id', userId)
    .select('meal_id as mealId', 'moods.id as moodId', 'emotion_id as emotionId', 'notes', 'moods.time as moodTime',
      'meals.time as mealTime', 'title')
}
