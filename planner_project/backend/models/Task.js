const mongoose = require('mongoose');


const TaskSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description: String,
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column',
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  boardId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Board',
  required: true
}
}, {timestamps:true})

  const Task = mongoose.model('Task', TaskSchema)
  
  module.exports = Task;