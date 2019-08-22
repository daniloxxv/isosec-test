require('dotenv').config();
const express     = require('express')
const router      = express.Router()
const mongoose    = require('mongoose')
const User        = require('../models/User')
const cleanInput  = require('../handlers/cleanInput')

mongoose.set('debug',true)
mongoose.Promise = Promise

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    keepAlive: true
})
.then(_=>{console.log("Connected to MongoDB")})
.catch(err=>console.log(err))

router.get('/users', (req,res)=>{
    let {amount,name} = req.query
    amount = +amount // coercing all amounts to numbers (or NaN) for security and practical reasons
    name = cleanInput(name)
    User.find(
        {name: new RegExp(name||'','i')},
        {name: 1, index: 1 }, //restricting the output to names and ids, since that's what will be consumed by the client
        {limit: amount||0} //in MongoDB, a limit of 0 is equivalent to setting no limit
         )
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.get('/users/:id', (req,res)=>{
    const id = cleanInput(req.params.id)
    User.findOne(
        {_id: id},
        {name: 1 }, //restricting the output to names and ids, since that's what will be consumed by the client
         )
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})

router.get('/users/:id/information', (req,res)=>{
    const id = cleanInput(req.params.id)
    User.findOne({_id: id})
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})

module.exports = router