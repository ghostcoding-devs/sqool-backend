const firestore = require('../storage/firestore')
const { docMapper } = require('../utils')

const collectionName = 'packages'

const getPackage = async id => {
  try {
    const result = await firestore.collection(collectionName).doc(id).get()
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

const getPackagesByClass = async classId => {
  try {
    const result = await firestore.collection(collectionName).where('classId', '==', classId).get()
    return docMapper(result.docs)
  } catch (error) {
    return {
      error: error.message,
      message: 'Arbeitspakete der Klasse konnten nicht gefunden werden.'
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

const updatePackage = async (id, payload) => {
  try {
    await firestore.collection(collectionName).doc(id).set(payload, { merge: true })
  } catch (error) {
    return {
      error: error.message,
      message: 'Arbeitspaket konnte nicht angepasst werden.'
    }
  }
}

module.exports = {
  getPackage,
  getPackagesByClass,
  createPackage,
  updatePackage
}
