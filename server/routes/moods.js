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

module.exports = router