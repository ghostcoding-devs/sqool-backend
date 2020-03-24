const { firestore, admin } = require('../storage/firestore')

const { docMapper } = require('../utils')

const collectionName = 'users'


const getUser = async userId => {
  try {
    return firestore.collection(collectionName).doc(userId).get()
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

const createUser = async (user, isTeacher) => {
  try {
    return firestore.collection(collectionName).add({
      isTeacher,
      ...user
    })
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
  console.log(email)
  try {
    admin.languageCode = 'de'
    const actionCodeSettings = {
      url: 'https://www.example.com/?email=user'
    }
   const x = await admin.sendPasswordResetEmail(email)
   console.log('x', x)
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