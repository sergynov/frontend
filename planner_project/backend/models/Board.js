const mongoose = require('mongoose')


const BoardSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }}, {timestamps: true})

  const Board = mongoose.model('Board', BoardSchema)
  
  module.exports = Board;