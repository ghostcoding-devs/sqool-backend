const firestore = require('../storage/firestore')

const collectionName = 'students'

const getStudent = async id => {
  try {
    const result = firestore.collection(collectionName).doc(id).get()
    if (!result.exists) {
      throw new Error()
    }
    return result.data()
  } catch (error) {
    return {
      error: error.message,
      message: 'Schüler konnte nicht gefunden werden.'
    }
  }
}

const createStudent = async (student) => {
  try {
    return firestore.collection(collectionName).add(student)
  } catch (error) {
    return {
      error: error.message,
      description: 'Schüler konnte nicht angelegt werden.'
    }
  }
}

module.exports = {
  getStudent,
  createStudent
}
