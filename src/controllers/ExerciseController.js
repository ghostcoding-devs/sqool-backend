const { exerciseService, storageService } = require('../services')

const createExercise = async (req, res) => {
  const { title, description, subject } = req.body
  const exercise = await exerciseService.createExercise({
    title,
    description,
    subject,
    createdBy: req.userId
  })
  if (req.file) {
    await storageService.uploadFile(req.file, `${req.userId}/${exercise.id}.${req.file.mimetype}`)
  }
  return res.json(exercise)
}

const listExercises = async (req, res) => {
  const exercises = await exerciseService.getExercisesByTeacher(req.userId)
  return res.json(exercises)
}

const getExercise = async (req, res) => {
  const { id } = req.params
  const exercise = await exerciseService.getExercise(id)
  return res.json(exercise)
}

module.exports = {
  createExercise,
  listExercises,
  getExercise
}

