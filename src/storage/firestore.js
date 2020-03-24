const config = require('config')
const admin = require('firebase-admin')

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(config.get('CLOUD.FIRESTORE'))
})

module.exports = {
  firestore: firebaseApp.firestore(),
  admin: firebaseApp.auth()
}