const express = require('express')
const db = require('../db/moods')
const router = express.Router()

router.get('/:mealId', (req, res) => {
  db.getMoods(req.params.mealId)
    .then(moods => {
      res.json(moods)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.post('/:mealId', (req, res) => {
  const mealId = Number(req.params.mealId)
  const mood = req.body
  mood.meal_id = mealId
  db.addMood(mood)
    .then(([id]) => {
      res.json(id)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.get('/mostRecent/:userId', (req, res) => {
  const userId = Number(req.params.userId)
  db.latestMood(userId)
    .then(mood => {
      res.json(mood)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.put('/editMood', (req, res) => {
  db.editMood(req.body)
    .then(() => {
      res.json('ok')
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.delete('/deleteMood/:moodId', (req, res) => {
  db.deleteMood(req.params.moodId)
    .then(() => {
      res.json('ok')
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

module.exports = router
