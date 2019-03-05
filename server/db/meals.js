const connection = require('./index')

module.exports = {
  userMeals,
  getMeal,
  getMoodsUserId,
  newMeal,
  latestMeal,
  editMeal,
  deleteMeal,
  allMealMoods,
  allUserMealsAndMoods
}

function userMeals (id, db = connection) {
  return db('meals')
    .where('user_id', id)
}

function getMeal (mealId, db = connection) {
  return db('meals')
    .where('id', mealId)
    .first()
}

function getMoodsUserId (moodId, db = connection) {
  return db('moods')
    .join('meals', 'moods.meal_id', '=', 'meals.id')
    .where('moods.id', moodId)
    .select('meals.user_id')
    .first()
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

function editMeal (meal, db = connection) {
  return db('meals')
    .where('id', meal.id)
    .update(meal)
}

function deleteMeal (mealId, db = connection) {
  return db('meals')
    .where('id', mealId)
    .delete()
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
