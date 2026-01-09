const Column = require('../models/Column')
const Board = require('../models/Board')
const Task = require('../models/Task')


const addColumn = async (userId,boardId, data) => {
  const board = await Board.findById(boardId);
  if (!board) throw new Error('Board not found');
  if (board.userId.toString() !== userId) throw new Error('Access denied'); //проверка прав

  const column = await Column.create({ boardId:boardId,title: data.title, order:data.order ?? 0})
  return column;
}

const deleteColumn = async (userId, columnId) =>{
  const column = await Column.findById(columnId).populate('boardId');

  if (!column) throw new Error('Column not found');
  if (column.boardId.userId.toString() !== userId) throw new Error('Access denied');

  await Task.deleteMany({ columnId: column._id });

  await column.deleteOne({ _id: column._id });
}

const updateColumn = async (userId, columnId, data ) => {
  const column = await Column.findById(columnId).populate('boardId')
  if (!column) throw new Error('Column not found');
  if (column.boardId.userId.toString() !== userId) throw new Error('Access denied');
  column.title = data.title ?? column.title;
  column.order = data.order ?? column.order;
  await column.save();
  return column;
}


module.exports = {
  updateColumn, addColumn, deleteColumn
}