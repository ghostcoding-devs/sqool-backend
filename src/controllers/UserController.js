const { userService } = require('../services')

const mergeUserProfiles = (userFromDb, basicProfileData, provider, providerData) => {
  basicProfileData.ids = basicProfileData.ids.concat(userFromDb.ids)
  return {
    ...basicProfileData,
    provider: {
      ...userFromDb.provider,
      [provider]: {
        ...providerData
      }
    }
  }
}

const createParent = async (req, res) => {
  // extract Data from Request
  const { user, additionalUserInfo } = req.body
  const provider = additionalUserInfo.providerId === 'google.com' ? 'google' : 'password'
  const email = user.email || additionalUserInfo.profile.email
  const userFromDb = await userService.getUser(email)
  const existingUser = userFromDb.success
  let lastName, firstName, displayName, photoURL
  if (existingUser) {
    if (provider === 'google' && userFromDb.data.provider.google) {
      return res.status(400).json({
        success: false,
        data: 'Google Account wurde bereits mit dem Konto verknüpft'
      })
    }
    if (provider === 'password') {
      lastName = userFromDb.data.lastName 
      firstName = userFromDb.data.firstName
      displayName = userFromDb.data.displayName
      photoURL = userFromDb.data.photoURL
    }
    if(provider === 'google') {
      lastName = additionalUserInfo.profile.given_name
      firstName = additionalUserInfo.profile.family_name
      displayName = user.displayName,
      photoURL = user.photoURL
    }
  } else {
    lastName = additionalUserInfo.profile ? additionalUserInfo.profile.given_name : ''
    firstName = additionalUserInfo.profile ? additionalUserInfo.profile.family_name : ''
    displayName = user.displayName || '',
    photoURL = user.photoURL || ''
  }
  const basicProfileData = {
    ids: [user.uid],
    email,
    firstName: firstName,
    lastName: lastName,
    displayName: displayName,
    photoURL: photoURL,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
  }
  const providerData = provider === 'google' ? {
    googleId: additionalUserInfo.profile.id,
    firebaseId: user.uid,
    locale: additionalUserInfo.profile.locale,
    grantedScopes: additionalUserInfo.profile.granted_scopes,
    locale: additionalUserInfo.profile.locale
  } : {
    firebaseId: user.uid,
    locale: 'de',
  }
  let userData 
  if(!userFromDb.success) {
    userData = {
      ...basicProfileData,
      provider: {
        [provider]: {
          ...providerData
        }
      }
    }
    await userService.createUser(userData, false)
  } else {
    userData = mergeUserProfiles (userFromDb.data, basicProfileData, provider, providerData)
    await userService.updateUser(email, userData)
  }
  return res.json({ 
    success: true,
    data: userData
  })

}
const getUser = async (req, res) => {
  const email = req.params.id
  const result = await userService.getUser(email)
  res.json(result)
}
const createTeacher = async (req, res) => {
  const { email } = req.body
  await userService.createUser({ email }, true)
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
  getUser,
  createTeacher,
  listUsers,
  resetPassword
}
