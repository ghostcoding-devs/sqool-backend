const { userService } = require('../services')

const createParent = async (req, res) => {
  const { email } = req.body
  await userService.createUser({
    email
  }, false)
}

const createTeacher = async (req, res) => {
  const { email } = req.body
  await userService.createUser({
    email
  }, true)
}

const updateUser = () => {
}

const deleteUser = () => {
  
}
const listUsers = async (_req, res) => {
  const result = await userService.listUsers()
  return res.json(result)
}
const resetPassword = async (req, res) => {
  const { email } = req.body
  const result = await userService.resetPassword(email)
  res.json(result)
}

module.exports = {
  createParent,
  createTeacher,
  listUsers,
  resetPassword
}
