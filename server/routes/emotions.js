const express = require('express')
const db = require('../db/emotions')
const router = express.Router()

router.get('/', (req, res) => {
  db.getEmotions()
    .then(emotions => {
      res.json(emotions)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
