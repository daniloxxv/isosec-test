const express = require('express')
const server  = express()
const router  = require('./routes')
const bodyParser = require('body-parser')

server.use(bodyParser.json())


server.use('/',router)
server.listen(3001)