const { firestore } = require('../storage/firestore')
const { docMapper } = require('../utils')

const collectionName = 'classes'

const getClass = async id => {
  try {
    const result = await firestore.collection(collectionName).doc(id).get()
    if (!result.exists) {
      throw new Error()
    }
    return result.data()
  } catch (error) {
    return {
      error: error.message,
      description: 'Die Klasse konnte nicht gefunden werden.'
    }
  }
}

const getClassesByTeacherId = async teacherId => {
  try {
    const result = await firestore.collection(collectionName).where('teacherId', '==', teacherId).get()
    return docMapper(result.docs)
  } catch (error) {
    return {
      error: error.message,
      description: 'Klassen konnten nicht gefunden werden.'
    }
  }
}

const createClass = async (teacherId, classData) => {
  try {
    return firestore.collection(collectionName).add({
      teacherId,
      ...classData
    })
  } catch (error) {
    return {
      error: error.message,
      description: 'Es konnte keine Klasse erstellt werden. Bitte versuchen Sie es nochmal.'
    }
  }
}

const updateClass = async (id, newClass) => {
  try {
    await firestore.collection(collectionName).doc(id).set(newClass, { merge: true })
  } catch (error) {
    return {
      error: error.message,
      description: 'Die Klasse konnte nicht aktualisiert werden.'
    }
  }
}

module.exports = {
  getClass,
  // getClasses,
  createClass,
  updateClass,
  getClassesByTeacherId
}