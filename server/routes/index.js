const express   = require('express')
const router    = express.Router()
const mongoose  = require('mongoose')
const User      = require('../models/User')

mongoose.set('debug',true)
mongoose.Promise = Promise

mongoose.connect('mongodb://daniloxxv:test123@ds211648.mlab.com:11648/isosec-test', {
    useNewUrlParser: true,
    keepAlive: true
})
.then(_=>{console.log("Connected to MongoDB")})
.catch(err=>console.log(err))

router.post('/', (req,res)=>{
    let user = new User(req.body)
    user.save()
    res.send('Post request received')
})

router.get('/users', (req,res)=>{
    let {amount,name} = req.query
    User.find(
        {name: new RegExp(name||'','i')},
        {name: 1, index: 1 }, //restricting the output to names and ids, since that's what will be consumed by the client
         {limit: +amount||0} //in MongoDB, a limit of 0 is equivalent to setting no limit
         )
    .then(users=>res.json(users))
    .catch(err=>res.json({'message':err}))
})

router.get('/users/:id', (req,res)=>{
    const {id} = req.params
    User.findOne(
        {_id: id},
        {name: 1 }, //restricting the output to names and ids, since that's what will be consumed by the client
         )
    .then(user=>res.json(user))
    .catch(err=>res.json({'message':err}))
})

router.get('/users/:id/information', (req,res)=>{
    const {id} = req.params
    User.findOne({_id: id})
    .then(user=>res.json(user))
    .catch(err=>res.json({'message':err}))
})

module.exports = router