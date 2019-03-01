const express = require('express')
const db = require('../db/meals')
const router = express.Router()

router.get('/:userId', (req, res) => {
const userId = Number(req.params.userId)
db.userMeals(userId)
.then(meals => {
    res.json(meals)
 })
 .catch(err => {
    res.status(500).send(err)
 })
})

router.post('/:userId', (req, res) => {
const userId = Number(req.params.userId)
const meal = req.body
meal.user_id = userId
db.newMeal(meal)
.then((data) => {
    res.json(data[0])
  })
 .catch(err => {
    res.status(500).send(err)
 })
})

router.get('/mostRecent/:userId', (req, res) => {
const userId = Number(req.params.userId)
db.latestMeal(userId)
.then(meal => {
    res.json(meal)
 })
 .catch(err => {
    res.status(500).send(err)
 })
})

router.get('/moods/:mealId', (req, res) => {
   const mealId = Number(req.params.mealId)
   db.allMealMoods(mealId)
   .then(mood => {
      res.json(mood)
   })
   .catch(err => {
      res.status(500).send(err)
   })
})

module.exports = router