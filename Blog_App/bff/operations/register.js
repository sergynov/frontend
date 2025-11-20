import { getOneUser, addUser } from "../api"
import { sessions } from "../sessions"

export const register = async (regLogin,regPassword) => {
    const userExist = await getOneUser(regLogin)

    if(userExist) {
      return {
        error: 'Login already exist',
        res: null
      }
    }

    const newUser = await addUser(regLogin,regPassword)


    return {
      error: null,
      res: {
        id: newUser.id,
        login: newUser.login,
        roleId: newUser.role_id,
        session: sessions.create(newUser)
      },
    }
  }