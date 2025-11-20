import { sessions } from "../sessions"

export const logout = async (session) => {
    return sessions.remove(session)
  }