import { appReducer, initialState } from "./reducer"
import { createStore } from "redux";

export const store =  createStore(appReducer,initialState);

/*
const createStore = (reducer,initialState)=> {

  let state = initialState; 

  return {
    dispatch: (action) =>{
      const newState = reducer(state, action)
    },
    getState: ()=> state
  }
}
*/
