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

module.exports = {
  createParent,
  createTeacher
}
