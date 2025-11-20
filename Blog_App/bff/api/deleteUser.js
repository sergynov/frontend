export const deleteUser = (userId) => 
    fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
      })