import { ROLE } from "../constants"
import { sessions } from "../sessions"
import { deleteUser } from "../api"

export const removeUser = async (hash, userId) => {
  const accessRoles = [ROLE.ADMIN]
    
    const access = await sessions.access(hash, accessRoles)

        if(!access) {
          return {
            error: 'Access denied',
            res: null
          }
        }
        
        await deleteUser(userId)
  
    return {
      error: null,
      res: true
    }
}