const firestore = require('../storage/firestore')

const collectionName = 'users'

const createUser = async (user, isTeacher) => {
  await firestore.collection(collectionName).add({
    isTeacher,
    ...user
  })
}

module.exports = {
  createUser
}