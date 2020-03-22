const firestore = require('../storage/firestore')
const { docMapper } = require('../utils')

const collectionName = 'students'

const getStudent = async id => {
  try {
    const result = await firestore.collection(collectionName).doc(id).get()
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

const getStudentsByClass = async classId => {
  try {
    const result = await firestore.collection(collectionName).where('classId', '==', classId).get()
    return docMapper(result.docs)
  } catch (error) {
    return {
      error: error.message,
      message: 'Schüler für diese Klasse konnten nicht gefunden werden.'
    }
  }
}

const getStudentsByParents = async parentId => {
  try {
    const result = await firestore.collection(collectionName).where('parentId', '==', parentId).get()
    return docMapper(result.docs)
  } catch (error) {
    return {
      error: error.message,
      message: 'Schüler dieser Eltern konnten nicht gefunden werden.'
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

const updateStudent = async (id, payload) => {
  try {
    await firestore.collection(collectionName).doc(id).set(payload, { merge: true })
  } catch (error) {
    return {
      error: error.message,
      description: 'Schüler konnte nicht geändert werden.'
    }
  }
}

const deleteStudent = async id => {
  try {
    await firestore.collection(collectionName).doc(id).delete()
  } catch (error) {
    return {
      error: error.message,
      description: 'Schüler konnte nicht gelöscht werden.'
    }
  }
}

module.exports = {
  getStudent,
  getStudentsByClass,
  getStudentsByParents,
  createStudent,
  updateStudent,
  deleteStudent
}
