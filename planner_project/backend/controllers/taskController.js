const Task = require('../models/Task')
const Board = require('../models/Board')
const Column = require('../models/Column')

const addTask = async (userId, columnId, data) => {
  const column = await Column.findById(columnId);
  if (!column) throw new Error('Column not found');

  const board = await Board.findById(column.boardId);
  if (!board) throw new Error('Board not found');
  const boardId = column.boardId

  if (board.userId.toString() !== userId) throw new Error('Access denied');
  const task = await Task.create( {columnId,boardId,  title: data.title, order:data.order ?? 0})
  return task
}

const deleteTask = async (taskId, userId) =>{
  const task = await Task.findById(taskId).populate({
    path: 'columnId',
    populate: { path: 'boardId' }
  });

  if (!task) throw new Error('Task not found');
  if (!task.columnId || !task.columnId.boardId) {
    throw new Error('Column or board not found');
  }
  if (task.columnId.boardId.userId.toString() !== userId) {
    throw new Error('Access denied');
  }
  await task.deleteOne();
}


const updateTask = async (userId, taskId, data) => {
  const task = await Task.findById(taskId).populate({
    path: 'columnId',
    populate: { path: 'boardId' }
  });

  if (!task) throw new Error('Task not found');

  if (task.columnId.boardId.userId.toString() !== userId) throw new Error('Access denied');


  task.title = data.title ?? task.title;
  task.description = data.description ?? task.description;
  task.order = data.order ?? task.order;
  task.columnId = data.columnId ?? task.columnId; 

  await task.save();
  return task;
};

const getAllTasks = async (userId) => {
  const boards = await Board.find({ userId }).select('_id');
  const boardIds = boards.map(b => b._id);
  const columns = await Column.find({ boardId: { $in: boardIds } }).select('_id');
  const columnIds = columns.map(c => c._id);

  const tasks = await Task.find({ columnId: { $in: columnIds } }).populate('columnId');
  return tasks
}

module.exports = {
addTask, deleteTask, updateTask, getAllTasks
}

