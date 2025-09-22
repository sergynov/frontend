import {combineReducers} from 'redux'
import {displayReducer} from './displayReduce'
import { formReducer } from './formReducer';
import { taskReducer } from './taskReducer'

export const appReducer = combineReducers({
  display: displayReducer,
  task: taskReducer,
  form: formReducer
})