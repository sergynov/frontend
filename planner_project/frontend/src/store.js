import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import{ thunk} from 'redux-thunk'
import { userReducer, boardReducer, searchReducer } from './reducers'
import { taskReducer } from './reducers/task-reducer'


  const reducer = combineReducers({
    user: userReducer,
    board: boardReducer,
    search: searchReducer,
    tasks: taskReducer
  })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))