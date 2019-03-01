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
db.newMeal(userId, req.body)
.then((data) => {
    res.json(data[0])
  })
 .catch(err => {
    res.status(500).send(err)
 })
})

module.exports = router