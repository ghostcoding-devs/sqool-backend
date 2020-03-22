const firestore = require('../storage/firestore')

const collectionName = 'classes'

const getClass = async id => {
  try {
    const result = firestore.collection(collectionName).doc(id).get()
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
    const result = firestore.collection(collectionName).where('teacherId', '==', teacherId).get()
    return result.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  } catch (error) {
    return {
      error: error.message,
      description: 'Klassen konnten nicht gefunden werden.'
    }
  }
}

const createClass = async classData => {
  try {
    return firestore.collection(collectionName).add(classData)
  } catch (error) {
    return {
      error: error.message,
      description: 'Es konnte keine Klasse erstellt werden. Bitte versuchen Sie es nochmal.'
    }
  }
}

module.exports = {
  getClass,
  getClasses,
  createClass,
  getClassesByTeacherId
}