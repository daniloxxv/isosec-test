require('dotenv').config();
const express       = require('express')
const server        = express()
const router        = require('./routes')
const bodyParser    = require('body-parser')
const cors          = require('cors')

server.use(bodyParser.json())

server.use(cors({
    credentials: true,
    origin: process.env.CLIENT
}))

server.use('/',router)
server.listen(process.env.PORT)

module.exports = server