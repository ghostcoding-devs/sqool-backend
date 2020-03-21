const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // const token = req.headers['authentication']
  // const decoded = jwt.decode(token)
  req.userId = '123' // decoded.userId
  next()
}