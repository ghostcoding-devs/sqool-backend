const router = require('express').Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { 
  classController, 
  userController, 
  packageController,
  studentController,
  exerciseController
} = require('./controllers')
const { 
  authMiddleware, 
  socketMiddleware
} = require('./middlewares')

module.exports = io => {
  // Classes
  router.get('/classes', classController.listClasses)
  router.get('/classes/:id', classController.getClass)
  router.post('/classes', authMiddleware, classController.createClass)
  router.put('/classes/:id', classController.updateClass)
  router.delete('/classes/:id', classController.deleteClass)

  // Users
  router.get('/users', userController.listUsers)
  router.get('/users/teachers', userController.listTeachers)
  router.get('/users/parents', userController.listParents)
  router.get('/users/:id', userController.getUser)
  router.post('/users/teachers', userController.createTeacher)
  router.post('/users/parents', userController.createParent)
  router.put('/users/:id', userController.updateUser)
  router.delete('/users/:id', userController.deleteUser)

  // Packages
  router.get('/packages', packageController.listPackages)
  router.get('/packages/:id', packageController.getPackage)
  router.post('/packages', packageController.createPackage)
  router.put('/packages/:id', packageController.updatePackage)
  router.delete('/packages/:id', packageController.deletePackage)

  // Exercises
  router.get('/exercises', exerciseController.listExercises)
  router.get('/exercises/:id', exerciseController.getExercise)
  router.post('/exercises', exerciseController.createExercise)
  router.put('/exercises/:id', exerciseController.updateExercise)
  router.delete('/exercises/:id', exerciseController.deleteExercise)

  // Students
  router.get('/students', studentController.listStudents)
  router.get('/students/:id', studentController.getStudent)
  router.post('/students', studentController.createStudent)
  router.put('/students/:id', studentController.updateStudent)
  router.delete('/students/:id', studentController.deleteStudent)

  return router
}