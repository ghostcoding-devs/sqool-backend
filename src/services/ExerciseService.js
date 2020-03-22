const firestore = require('../storage/firestore')

const collectionName = 'exercises'

const createExercise = async (exercise) => {
  try {
    return firestore.collection(collectionName).add(exercise)
  } catch (error) {
    return {
      error: error.message,
      description: 'Übung konnte nicht erstellt werden.'
    }
  }
}

const getExercise = async id => {
  try {
    const result = firestore.collection(collectionName).doc(id).get()
    if (!result.exists) {
      throw new Error()
    }
    return result.data()
  } catch (error) {
    return {
      error: error.message,
      description: 'Übung konnte nicht gefunden werden.'
    }
  }
}

module.exports = {
  getExercise,
  createExercise
}