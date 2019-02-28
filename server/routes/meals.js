const express = require('express')
const db = require('../db/meals')
const router = express.Router()

router.get('/api/v1/meals/:userId')
const userId = Number(req.params.userId)
db.userMeals(userId)
.then(meals => {
    res.json(meals)
 })
 .catch(err => {
    res.status(500).send('DATABASE ERROR: ' + err.message)
})

