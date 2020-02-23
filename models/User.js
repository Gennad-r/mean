const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userScema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('users', userScema)