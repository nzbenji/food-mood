const express = require('express')
const db = require('../db/meals')
const router = express.Router()

router.get('/:userId', (req, res) => {
  const userId = Number(req.params.userId)
  db.allUserMealsAndMoods(userId)
    .then(meals => {
      res.json(moodToMoodArr(meals))
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

router.put('/editMeal', (req, res) => {
  db.editMeal(req.body)
    .then(() => {
      res.json('hello')
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

function moodToMoodArr (meals) {
  let newArr = []
  for (const meal of meals) {
    const index = newArr.findIndex((elem) => elem.id === meal.mealId)
    const mood = getMoodDataFromMeal(meal)
    if (index >= 0) {
      newArr[index].moods.push(mood)
    } else {
      newArr.push({...getMealInfo(meal), moods: [mood]})
    }
  }
  return newArr
}

function getMoodDataFromMeal (meal) {
  return {
    id: meal.moodId,
    mealId: meal.mealId,
    notes: meal.notes,
    emotionId: meal.emotionId,
    time: meal.moodTime
  }
}

function getMealInfo (meal) {
  return {
    id: meal.mealId,
    time: meal.mealTime,
    title: meal.title
  }
}
module.exports = router
