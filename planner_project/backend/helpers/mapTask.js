module.exports = function mapTask (task) {
  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    columnId: task.columnId._id.toString(),
    order: task.order,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
    boardId: task.columnId?.boardId?._id,
  }
}