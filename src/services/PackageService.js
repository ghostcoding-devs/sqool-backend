const firestore = require('../storage/firestore')

const collectionName = 'packages'

const getPackage = async id => {
  try {
    const result = firestore.collection(collectionName).doc(id).get()
    if (!result.exists) {
      throw new Error()
    }
    return result.data()
  } catch (error) {
    return {
      error: error.message,
      message: 'Arbeitspaket konnte nicht gefunden werden.'
    }
  }
}

const createPackage = async (package) => {
  try {
    return firestore.collection(collectionName).add(package)
  } catch (error) {
    return {
      error: error.message,
      description: 'Arbeitspaket konnte nicht erstellt werden.'
    }
  }
}

module.exports = {
  getPackage,
  createPackage
}
