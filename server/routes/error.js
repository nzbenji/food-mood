// auth.handleError
function authCheckingError (err, req, res, next) {
  if (err) {
    return res.status(403).json({
      message: 'Access to this resource was denied.',
      error: err.message
    })
  }
  next()
}

function authMatchError (req, res) {
  return res.status(403).json({
    message: 'Access to this resource was denied.'
  })
}

module.exports = {
  authCheckingError,
  authMatchError
}
