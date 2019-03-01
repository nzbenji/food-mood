const express = require('express')
const db = require('../db/meals')
const router = express.Router()

router.get('/mostRecent/:userId', (req, res) => {
    const mealId = Number(req.params.userId)
    db.latestMood(mealId)
    .then(mood => {
        res.json(mood)
     })
     .catch(err => {
        res.status(500).send(err)
     })
    })

module.exports = router