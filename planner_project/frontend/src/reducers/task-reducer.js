import { ACTION_TYPE } from "../actions";

const initialState = {
  all: [],
  loading: false,
  error: null
};

export const taskReducer = (state=initialState, action) => {
  switch(action.type) {
    case ACTION_TYPE.SET_ALL_TASKS:
      return {
        ...state,
        all: action.payload
      };

    default:
      return state;
  }
}

