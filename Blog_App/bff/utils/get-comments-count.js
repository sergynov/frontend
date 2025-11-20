export const getCommentsCount = (comments =[], postId) => {

  const postComments = comments.filter(({postId: commentPostId}) => commentPostId === postId)
  return postComments.length
}