const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    index: Number,
    picture: String,
    name: String,
    gender: String,
    email:  String,
    phone: String,
    address: String,
    registered: String,
    friends: Array
})

const User = mongoose.model('User', userSchema)
module.exports = User