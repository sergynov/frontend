module.exports = function mapBoard (board) {
  return {
    id: board._id.toString(),
    title: board.title,
    userId: board.userId.toString(),
    createdAt: board.createdAt,
    updatedAt: board.updatedAt
  }
}