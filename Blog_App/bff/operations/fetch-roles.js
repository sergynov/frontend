import { getRoles } from "../api"
import { sessions } from '../sessions'
import { ROLE } from '../constants'

export const fetchRoles = async (hash) => {
  const accessRoles = [ROLE.ADMIN]

    const access = await sessions.access(hash, accessRoles)

        if(!access) {
          return {
            error: 'Access denied',
            res: null
          }
        }

    const roles = await getRoles()

    return {
      error: null,
      res: roles
    }
  }