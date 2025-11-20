import { removeComment } from "./session/remove-comment";
import {ROLE} from '../constants/role'

export const createSession = (roleId) => {

  const session = {
    logOut(){
          Object.keys(session).forEach((key)=>{
            delete session[key];
          })
  }
  }
  switch(roleId) {
    case ROLE.ADMIN: {
      session.removeComment = removeComment;
      break;
    }
    case ROLE.MODERATOR: {
      session.removeComment = removeComment;
      break;
    }
    case ROLE.READER: {
      break;
    }
    case ROLE.GUEST: {

      break;
    }
    default: 
  }

  return session;

}