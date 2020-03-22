const { studentService } = require('../services')

const createStudent = async (req, res) => {
  const { name, classId } = req.body
  const student = await studentService.createStudent({
    name,
    parentId: req.userId,
    classId
  })
  return res.json(student)
}

const getStudent = async (req, res) => {
  const { id } = req.params
  const student = await studentService.getStudent(id)
  return res.json(student)
}

const listClassStudents = async (req, res) => {
  const { classId } = req.params
  const students = await studentService.getStudentsByClass(classId)
  return res.json(students)
}

const listParentStudents = async (req, res) => {
  const { parentId } = req.params
  const students = await studentService.getStudentsByParents(parentId)
  return res.json(students)
}

module.exports = {
  createStudent,
  getStudent,
  listClassStudents,
  listParentStudents
}