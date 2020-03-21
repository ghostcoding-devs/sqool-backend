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
      message: 'Die Klasse konnte nicht gefunden werden.'
    }
  }
}

const createClass = async (teacherId, name) => {
  try {
    return firestore.collection(collectionName).add({
      teacherId,
      name
    })
  } catch (error) {
    return {
      error: error.message,
      message: 'Es konnte keine Klasse erstellt werden. Bitte versuchen Sie es nochmal.'
    }
  }
}

module.exports = {
  getClass,
  createClass
}