const { firestore, admin } = require('../storage/firestore')

const { docMapper } = require('../utils')

const collectionName = 'users'


const getUser = async id => {
  try {
    const requestUser = await firestore.collection(collectionName).doc(id).get()
    const userData = requestUser.data()
    const user = {
      ...requestUser.data(),
      id: requestUser.id
    }
    if (userData) {
      return user
    } else {
      return {
        error: 'User not found',
        description: `User with id: ${id} not found`
      }
    }
  } catch (error) {
    return {
      error: error.message,
      description: 'Der Nutzer konnte nicht gefunden werden.'
    }
  }
}

const listUsers = async () => {
  try {
    // implement pagination 
    // db call machen und daten zusammenlegen
    return { users } = await admin.listUsers(1000)
  } catch (err) {
    return {
      error: err.message,
      description: 'Nutzerübersicht konnte nicht geladen werden'
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

const createUser = async (id, userData) => {
  try {
    return await firestore.collection(collectionName).doc(id).set(userData)
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


// var auth = firebase.auth();
// var emailAddress = "user@example.com";

// auth.sendPasswordResetEmail(emailAddress).then(function() {
//   // Email sent.
// }).catch(function(error) {
//   // An error happened.
// });

const resetPassword = async (email) => {
  try {
    admin.languageCode = 'de'
    const actionCodeSettings = {
      url: 'https://www.example.com/?email=user'
    }
   return await admin.sendPasswordResetEmail(email)
  } catch (err) {
    console.log(err)
    return {
      error: err.message,
      description: 'Fehler beim zurücksetzen des Passwortes'
    }
  }
}

module.exports = {
  getUser,
  listUsers,
  getTeachers,
  getParents,
  createUser,
  updateUser,
  deleteUser,
  resetPassword
}