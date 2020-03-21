const config = require('config')
const admin = require('firebase-admin')

const db = admin.initializeApp({
  credential: admin.credential.cert(config.get('CLOUD.FIRESTORE'))
})

module.exports = db.firestore()