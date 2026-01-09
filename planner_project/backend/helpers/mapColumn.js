module.exports = function mapColumn (column) {
  return {
    id: column._id.toString(),
    title: column.title,
    boardId: column.boardId.toString(),
    order: column.order,
    createdAt: column.createdAt,
    updatedAt: column.updatedAt
  }
}