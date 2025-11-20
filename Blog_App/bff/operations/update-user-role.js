import { setUserRole } from "../api"
import { ROLE } from "../constants"
import { sessions } from "../sessions"

export  const updateUserRole = async (hash,userId,newUserRoleId) => {

  const accessRoles = [ROLE.ADMIN]
  
  const access = await sessions.access(hash, accessRoles)

        if(!access) {
          return {
            error: 'Access denied',
            res: null
          }
        }

    setUserRole(userId,newUserRoleId)

  return {
    error: null,
    res: true
  }
}