
export const deleteComment = async (commentId) => 
  fetch(`http://localhost:3000/comments/${commentId}`, {
        method: 'DELETE',
      })
