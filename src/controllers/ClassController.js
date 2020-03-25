const { classService, studentService, packageService } = require('../services')

const getClass = async (req, res) => {
  const { id } = req.params
  const classResult = await classService.getClass(id)
  const students = await studentService.getStudentsByClass(id)
  const packages = await packageService.getPackagesByClass(id)
  return res.json({
    ...classResult,
    students,
    packages
  })
}

const listClasses = async (req, res) => {
  const result = await classService.getClassesByTeacherId(req.userId)
  return res.json(result)
}

const createClass = async (req, res) => {
  const result = await classService.createClass(req.userId, req.body)
  return res.json(result)
}

const updateClass = async (req, res) => {
  const { id } = req.params
  const result = await classService.updateClass(id, req.body)
  return res.json(result)
}

const deleteClass = (req, res) => {

}

module.exports = {
  getClass,
  updateClass,
  listClasses,
  createClass
}