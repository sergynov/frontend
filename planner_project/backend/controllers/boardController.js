const Board = require('../models/Board')
const Column = require('../models/Column')
const Task = require('../models/Task')

//create
const createBoard = async (userId, data) => {

    const board = await Board.create({
      title: data.title,
      userId: userId
    })

  return board.toObject()
}

//get all boards /boards

const getBoards = async (userId,search = '') =>{
  const board = await Board.find({userId:userId, title: { $regex: search, $options: 'i' }})
  return board
}


//get one board /boards/:id

const getBoard = async (id) => {
  const board = await Board.findById(id)
  if (!board) {
    throw new Error('Board not found');
  }
  const columns = await Column.find({ boardId: board._id })
      .sort({ order: 1 });

    const columnIds = columns.map(c => c._id);

    const tasks = await Task.find({ columnId: { $in: columnIds } })
      .sort({ order: 1 });

      return {board, columns, tasks}
}

// delete board

const deleteBoard = async (userId, boardId) =>{
  const board = await Board.findOneAndDelete({_id: boardId, userId})

  if(!board) {
    throw new Error('Board not found')
  }
  const columns = await Column.find({ boardId: board._id });
  const columnIds = columns.map(c => c._id);

  await Task.deleteMany({ columnId: { $in: columnIds } });
  await Column.deleteMany({ boardId: board._id });
}

// update board
const updateBoard = async (userId, boardId, data) => {
  const newBoard = await Board.findOneAndUpdate({ _id: boardId, userId: userId }, data, {new:true})
  return newBoard;
}


module.exports = {
  createBoard, getBoard, getBoards, deleteBoard, updateBoard
}