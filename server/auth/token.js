const jwt = require('jsonwebtoken')

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
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

function getSecret (req, payload, done) {
  const secret = process.env.JWT_SECRET
  done(null, secret)
}
