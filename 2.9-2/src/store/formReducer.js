const initialState = {
  newTitle: '',
  newBody: '',
  currentTask: null
}

export const formReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FORM/SET_TITLE':
      return {...state, newTitle: action.payload}

    case 'FORM/SET_BODY':
      return {...state, newBody: action.payload}

    case 'FORM/SET_TASK':
      return {...state,
        currentTask: action.payload,
        newTitle: action.payload?.title || '',
        newBody: action.payload?.body || ''
      }

    case 'FORM/CLEAR':
      return initialState

    default:
      return state
  }
}