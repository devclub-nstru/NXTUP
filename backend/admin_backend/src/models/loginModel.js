const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Email:String,
    Password:String
})

const login = new mongoose.model('user',userSchema)

module.exports = login