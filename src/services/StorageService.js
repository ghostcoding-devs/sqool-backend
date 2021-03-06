const config = require('config')
const { Storage } = require('@google-cloud/storage')

const bucketName = 'sqool'

const bucket = new Storage({
  credentials: config.get('CLOUD.STORAGE')
}).bucket(bucketName)

const uploadFile = (file, path) => {
  return new Promise((resolve, reject) => {
    const stream = bucket.file('exercises/' + path).createWriteStream({
      metadata: {
        contentType: file.mimetype
      },
      resumable: false
    })

    stream.on('error', err => {
      reject(err)
    })
  
    stream.on('finish', () => {
      file.makePublic().then(() => {
        resolve(`https://storage.googleapis.com/${bucketName}/${path}`)
      })
    })
  
    stream.end(file.buffer)
  })
}

module.exports = {
  uploadFile
}
