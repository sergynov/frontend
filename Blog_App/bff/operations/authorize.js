import { getOneUser } from "../api"
import { sessions } from "../sessions"

export const authorize = async (authLogin,authPassword) => {
    const user = await getOneUser(authLogin)


    if(!user) {
      return {
        error: 'Login not found',
        res: null
      }
    }

    const {id,login, password, registeret_at, roleId} = user

    if(authPassword != password) {
      return {
        error: 'Password is not correct',
        res: null
      }
    }



    return {
      error: null,
      res: {
        id,
        login,
        roleId,
        registeret_at,
        session: sessions.create(user)
      },
    }
  }