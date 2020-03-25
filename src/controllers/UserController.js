const { userService } = require('../services')

const createParent = async (req, res) => {
  // extract Data from Request
  const { user, additionalUserInfo } = req.body
  const provider = additionalUserInfo.providerId

  const basicProfileData = {
    email: user.email,
    firstName: '',
    lastName: '',
    displayName: '',
    photoURL: '',
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
  }
  const userData = {
    ...basicProfileData,
    provider: {
      [provider]: {
        ...additionalUserInfo
      }
    },
    roles: {
      teacher: false,
      admin: false,
    },
    settings: {
      notifications: true,
      onboardingCompleted: false
    }
  }
  await userService.createUser(user.uid, userData, false)
  return res.json({ success: true, data: userData })

}
const getUser = async (req, res) => {
  const id = req.params.id
  const result = await userService.getUser(id)
  res.json(result)
}
const createTeacher = async (req, res) => {
  const { email } = req.body
  await userService.createUser({ email }, true)
}

const updateUser = async (req, res) => {
  const id = req.params.id
  const updateData = req.body
  await userService.updateUser(id, updateData)
  const result = await userService.getUser(id)
  return res.json(result)
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
  getUser,
  updateUser,
  createTeacher,
  listUsers,
  resetPassword
}
