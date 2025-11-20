import { ROLE } from "../../constants/role"
import { ACTION_TYPE } from "../actions/action-types"

const initialUserState = {
  id: null,
  login: null,
  roleId: ROLE.GUEST,
  session: null
}

export const userReducer = (state=initialUserState,action) => {
  switch (action.type) {

    case ACTION_TYPE.SET_USER: {
      return {
        ...state,
        ...action.payload
      }
    }

    case ACTION_TYPE.LOGOUT:{
      return initialUserState;
    }

    default: 
      return state
  }
}