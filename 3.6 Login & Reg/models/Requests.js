const mongoose = require('mongoose')

const RequestsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Requests = mongoose.model('Requests', RequestsSchema)

module.exports = Requests;