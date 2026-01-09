const mongoose = require('mongoose')


const ColumnSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  order: {
    type: Number,
    required: true
  }
})

  const Column = mongoose.model('Column', ColumnSchema)
  
  module.exports = Column;