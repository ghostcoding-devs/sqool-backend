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
  router.get('/classes', authMiddleware, classController.listClasses)
  router.get('/classes/:id', classController.getClass)
  router.post('/classes', authMiddleware, socketMiddleware(io), classController.createClass)
  router.put('/classes/:id', socketMiddleware(io), classController.updateClass)
  // router.delete('/classes/:id', socketMiddleware(io), classController.deleteClass)

  // Users
  router.get('/users/:id', userController.getUser)
  router.post('/users/parents', userController.createParent)
  router.get('/users', userController.listUsers)
  // router.get('/users/teachers', userController.listTeachers)
  // router.get('/users/parents', userController.listParents)
  router.post('/users/teachers', userController.createTeacher)
  router.put('/users/:id', socketMiddleware(io), userController.updateUser)
  // router.delete('/users/:id', userController.deleteUser)
  router.put('/users/resetPassword', userController.resetPassword)

  // Packages
  // router.get('/packages', packageController.listPackages)
  // router.get('/packages/:id', packageController.getPackage)
  router.post('/packages', packageController.createPackage)
  // router.put('/packages/:id', socketMiddleware(io), packageController.updatePackage)
  // router.delete('/packages/:id', socketMiddleware(io), packageController.deletePackage)

  // router.get('/classes/packages/:classId', packageController.listClassPackages)

  // Exercises
  router.get('/exercises', authMiddleware, exerciseController.listExercises)
  router.get('/exercises/:id', exerciseController.getExercise)
  router.post('/exercises', authMiddleware, upload.single('uploadFile'), exerciseController.createExercise)
  // router.put('/exercises/:id', socketMiddleware(io), exerciseController.updateExercise)
  // router.delete('/exercises/:id', socketMiddleware(io), exerciseController.deleteExercise)

  // Students
  // router.get('/students', studentController.listStudents)
  // router.get('/students/:id', studentController.getStudent)
  router.get('/students/parents/:parentId', studentController.listParentStudents)
  router.post('/students/parents/free', studentController.getFreeStudentsByParents)
  // router.post('/students', studentController.createStudent)
  // router.put('/students/:id', studentController.updateStudent)
  // router.delete('/students/:id', studentController.deleteStudent)

  router.get('/classes/students/:classId', studentController.listClassStudents)

  return router
}