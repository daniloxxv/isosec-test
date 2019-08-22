const express       = require('express')
const server        = express()
const router        = require('./routes')
const bodyParser    = require('body-parser')
const cors          = require('cors')

server.use(bodyParser.json())

server.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

server.use('/',router)
server.listen(3001)