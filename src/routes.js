const router = require('express').Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { classController, userController } = require('./controllers')
const { authMiddleware, socketMiddleware } = require('./middlewares')

module.exports = io => {
  // Classes
  router.post('/classes', authMiddleware, classController.createClass)

  // Users
  router.post('/users/teacher', userController.createTeacher)
  router.post('/users/parent', userController.createParent)

  return router
}