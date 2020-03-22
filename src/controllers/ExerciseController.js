const { exerciseService, storageService } = require('../services')

const createExercise = async (req, res) => {
  const { title, description, subject } = req.body
  let storageUrl
  if (req.file) {
    storageUrl = await storageService.uploadFile(req.file, `${req.userId}/${title}.${req.file.mimetype}`)
  }
  const exercise = await exerciseService.createExercise({
    title,
    description,
    subject,
    createdBy: req.userId,
    storageUrl
  })
  return res.json(exercise)
}

const getExercise = async (req, res) => {
  const { id } = req.params
  const exercise = await exerciseService.getExercise(id)
  return res.json(exercise)
}

module.exports = {
  createExercise,
  getExercise
}

