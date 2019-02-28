const express = require('express')
const db = require('../db/users')
const router = express.Router()
const token = require('../auth/token')
const hash = require('../auth/hash')

router.post('/register', register, token.issue)
router.post('/login', validateLogin, checkUser, token.issue)

function register (req, res, next) {
  db.registerUser(req.body)
    .then((user) => {
      res.locals.userId = user[0]
      next()
    })
    .catch(({message}) => {
      message.includes('UNIQUE constraint failed: users.username')
        ? registrationError(res, 'User already exists.', 400)
        : registrationError(res, `Something bad happened. We don't know why.`, 500)
    })
}

function validateLogin (req, res, next) {
  const {username, password} = req.body

  if (!username) {
    return next(new Error('No username provided'))
  }
  if (!password) {
    return next(new Error('No password provided'))
  }

  next()
}

function checkUser (req, res, next) {
  db.getUser(req.body)
    .then(user => {
      if (user) res.locals.userId = user.id
      return user && hash.verify(user.hash, req.body.password)
    })
    .then(isValid => {
      return isValid ? next() : invalidCredentials(res)
    })
    .catch(() => {
      res.status(400).json({
        errorType: 'DATABASE_ERROR'
      })
    })
}

function invalidCredentials (res) {
  res.status(400).json({
    errorType: 'INVALID_CREDENTIALS'
  })
}

function registrationError (res, errorMessage, errorCode) {
  res.status(errorCode).json({
    ok: false,
    message: errorMessage
  })
}

module.exports = router
