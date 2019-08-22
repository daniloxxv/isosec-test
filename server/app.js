require('dotenv').config();
const express       = require('express')
const server        = express()
const router        = require('./routes')
const bodyParser    = require('body-parser')
const cors          = require('cors')
const path          = require('path')

server.use(bodyParser.json())

server.use(cors({
    credentials: true,
    origin: process.env.DEVCLIENT
}))

server.use(express.static(path.join(__dirname, 'public')))
server.use('/api',router)

server.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'public/index.html'));
});

server.listen(process.env.PORT)

module.exports = server