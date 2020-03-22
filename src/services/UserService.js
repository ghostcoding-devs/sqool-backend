const firestore = require('../storage/firestore')

const collectionName = 'users'

const createUser = async (user, isTeacher) => {
  try {
    return firestore.collection(collectionName).add({
      isTeacher,
      ...user
    })
  } catch (error) {
    return {
      error: error.message,
      description: 'Der Nutzer konnte nicht erstellt werden.'
    }
  }
}

module.exports = {
  createUser
}