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
.then(x=>{console.log("Connected to MongoDB")})
.catch(err=>console.log(err))

router.get('/users', (req,res)=>{
    let {amount,name} = req.query
    User.find(
        {name: new RegExp(name||'','i')},
         null, 
         {limit: amount||0} //in MongoDB, a limit of 0 is equivalent to setting no limit
         )
    .then(users=>res.json(users))
    .catch(err=>res.json({'message':err}))
})


module.exports = router