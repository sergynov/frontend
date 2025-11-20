export const deletePost = (postId) => 
    fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
      })