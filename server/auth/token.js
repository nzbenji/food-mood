const jwt = require('jsonwebtoken')
const jwtTestSecret = require('../../tests/routes/jwt-test-secret')

module.exports = {
  issue,
  getSecret
}

function issue (req, res) {
  res.json({
    ok: true,
    message: 'Authentication successful.',
    userId: res.locals.userId,
    token: createToken(res.locals.userId)
  })
}

function createToken (id) {
  const secret = process.env.JWT_SECRET || jwtTestSecret
  return jwt.sign({id}, secret, {expiresIn: '1d'})
}

function getSecret (req, payload, done) {
  const secret = process.env.JWT_SECRET || jwtTestSecret
  done(null, secret)
}
