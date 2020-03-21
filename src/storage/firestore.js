const config = require('config')
const {
  project_id: projectId,
  private_key: privateKey,
  client_email: clientEmail
} = config.get('CLOUD.FIRESTORE')
const { FirestoreClient } = require('botfriends-firestore-sdk')

module.exports = new FirestoreClient({
  privateKey,
  projectId,
  clientEmail
})