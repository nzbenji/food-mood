const express = require('express')
const db = require('../db/moods')
const router = express.Router()

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

router.put('/editMood', (req, res) => {
  db.editMood(req.body)
    .then(() => {
      res.json('ok')
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

module.exports = router
