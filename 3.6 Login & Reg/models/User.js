const mongoose = require('mongoose')
const { required } = require('yargs')
const validator = require('validator')


const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid Email'
    }
  },
  password: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;