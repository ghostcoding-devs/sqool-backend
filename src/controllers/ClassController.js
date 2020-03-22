const { classService } = require('../services')

const getClass = async (req, res) => {
  const { id } = req.params
  const result = await classService.getClass(id)
  return res.json(result)
}

const listClasses = async (req, res) => {
  const result = await classService.getClassesByTeacherId(req.userId)
  return res.json(result)
}

const createClass = async (req, res) => {
  const { name } = req.body
  const result = await classService.createClass(req.userId, name)
  return res.json(result)
}

const updateClass = (req, res) => {

}

const getClassStudents = () => {

}

const addStudentToClass = (req, res) => {

}

const removeStudentFromClass = (req, res) => {

}

const deleteClass = (req, res) => {

}

module.exports = {
  getClass,
  listClasses,
  createClass
}