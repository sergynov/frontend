const initialState = {
  isSorted: false,
  searchTask: '',
  isModalOpen: false
}

export const displayReducer = (state=initialState, action)=> {
  switch(action.type) {
    case 'DISPLAY/TOGGLE_SORT':
      return {...state, isSorted:!state.isSorted}

    case 'DISPLAY/SET_SEARCH':
      return {...state, searchTask: action.payload}

    case 'DISPLAY/TOGGLE_MODAL':
      return {...state, isModalOpen: !state.isModalOpen}

    default:
      return state
  }
}