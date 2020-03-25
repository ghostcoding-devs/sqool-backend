const cors = require('cors')
const config = require('config')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Initialize Express
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
app.set('port', config.get('APP.PORT'))

// Express Routes
const routes = require('./src/routes')(io)

// MiddleWare
app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({
  limit: '20mb',
  extended: true
}))
app.use(bodyParser.json({ limit: '20mb' }))
app.use(morgan('dev'))
app.use('/api/v1', routes)

// Start Server and Connect to DB
server.listen(app.get('port'), () => {
  console.log(`Sqool Backend listening on port ${app.get('port')}`)
})

module.exports = server
