const { firestore } = require('../storage/firestore')
const { docMapper } = require('../utils')

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
    const result = await firestore.collection(collectionName).doc(id).get()
    if (!result.exists) {
      throw new Error('No document found.')
    }
    return result.data()
  } catch (error) {
    return {
      error: error.message,
      description: 'Übung konnte nicht gefunden werden.'
    }
  }
}

const getExercisesByTeacher = async teacherId => {
  try {
    const result = await firestore.collection(collectionName).where('createdBy', '==', teacherId).get()
    return docMapper(result.docs)
  } catch (error) {
    return {
      error: error.message,
      description: 'Es konnten keine Übungen gefunden werden.'
    }
  }
}

const deleteExercise = async id => {
  try {
    await firestore.collection(collectionName).doc(id).delete()
  } catch (error) {
    return {
      error: error.message,
      description: 'Übung konnte nicht gelöscht werden.'
    }
  }
}

module.exports = {
  getExercise,
  getExercisesByTeacher,
  createExercise,
  deleteExercise
}
