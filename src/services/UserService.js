const firestore = require('../storage/firestore')
const { docMapper } = require('../utils')

const collectionName = 'users'

const getUser = async userId => {
  try {
    return firestore.collection(collectionName).doc(userId).get()
  } catch (error) {
    return {
      error: error.message,
      description: 'Der Nutzer konnte nicht gefunden werden.'
    }
  }
}

const getTeachers = async () => {
  try {
    const result = await firestore.collection(collectionName).where('isTeacher', '==', true).get()
    return docMapper(result.docs)
  } catch (error) {
    return {
      error: error.message,
      description: 'Lehrer konnten nicht gefunden werden.'
    }
  }
}

const getParents = async () => {
  try {
    const result = await firestore.collection(collectionName).where('isTeacher', '==', false).get()
    return docMapper(result.docs)
  } catch (error) {
    return {
      error: error.message,
      description: 'Eltern konnten nicht gefunden werden.'
    }
  }
}

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

const updateUser = async (id, payload) => {
  try {
    await firestore.collection(collectionName).doc(id).set(payload, { merge: true })
  } catch (error) {
    return {
      error: error.message,
      description: 'Der Nutzer konnte nicht geändert werden.'
    }
  }
}

const deleteUser = async id => {
  try {
    await firestore.collection(collectionName).doc(id).delete()
  } catch (error) {
    return {
      error: error.message,
      description: 'Der Nutzer konnte nicht gelöscht werden.'
    }
  }
}

module.exports = {
  getUser,
  getTeachers,
  getParents,
  createUser,
  updateUser,
  deleteUser
}