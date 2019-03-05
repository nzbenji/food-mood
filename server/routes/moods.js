const express = require('express')
const db = require('../db/moods')
const mealDb = require('../db/meals')
const router = express.Router()
const verifyJwt = require('express-jwt')
const token = require('../auth/token')
const error = require('./error')

router.use(
  verifyJwt({
    secret: token.getSecret
  }),
  error.authCheckingError
)

router.get('/:mealId', (req, res) => {
  mealDb.getMeal(req.params.mealId)
    .then((meal) => {
      if (meal.user_id !== req.user.id) {
        return error.authMatchError(req, res)
      }
      db.getMoods(req.params.mealId)
        .then(moods => {
          res.json(moods)
        })
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.post('/:mealId', (req, res) => {
  const mealId = Number(req.params.mealId)
  const mood = req.body
  mood.meal_id = mealId
  mealDb.getMeal(req.params.mealId)
    .then((meal) => {
      if (meal.user_id !== req.user.id) {
        return error.authMatchError(req, res)
      }
      db.addMood(mood)
        .then(([id]) => {
          res.json(id)
        })
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.get('/mostRecent/:userId', (req, res) => {
  const userId = Number(req.params.userId)
  if (userId !== req.user.id) {
    return error.authMatchError(req, res)
  }
  db.latestMood(userId)
    .then(mood => {
      res.json(mood)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.put('/editMood', (req, res) => {
  mealDb.getMoodsUserId(req.body.id)
    .then((meal) => {
      if (meal.user_id !== req.user.id) {
        return error.authMatchError(req, res)
      }
      db.editMood(req.body)
        .then(() => {
          res.json('ok')
        })
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.delete('/deleteMood/:moodId', (req, res) => {
  mealDb.getMoodsUserId(req.params.moodId)
    .then((meal) => {
      if (meal.user_id !== req.user.id) {
        return error.authMatchError(req, res)
      }
      db.deleteMood(req.params.moodId)
        .then(() => {
          res.json('ok')
        })
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

module.exports = router
