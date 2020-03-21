const router = require('express').Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const withSocket = io => (req, _res, next) => { req.io = io; next() }

module.exports = io => {
  
  return router
}