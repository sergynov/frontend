const initialState = {
  items : [] ,
  displayedItems:[],
  isLoading: false,
  error: null
}

export const taskReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'TASKS/LOAD_START':
      return {...state, isLoading:true, error:null}

    case 'TASKS/LOAD_SUCCESS':
      return {...state, isLoading:false, items:action.payload, displayedItems: action.payload}
    
    case 'TASKS/LOAD_ERROR' :
      return {...state, isLoading:false, error:action.payload}

    case 'TASKS/ADD': 
      return {...state, items:[...state.items, action.payload], displayedItems:[...state.displayedItems, action.payload]}

    case 'TASKS/REMOVE':
      return {...state, 
        items: state.items.filter(task=>task.id !== action.payload),
        displayedItems:state.displayedItems.filter(task=>task.id !== action.payload)}

    case 'TASKS/UPDATE':
      return {
        ...state,
        items: state.items.map(task=> task.id === action.payload.id ? action.payload : task ),
        displayedItems: state.displayedItems.map(task => task.id === action.payload.id ? action.payload : task)
      }

    case 'TASKS/FILTER_AND_SORT': {
      const { search, isSorted } = action.payload
      let result = state.items.filter(
        (todo) =>
          todo.title.toLowerCase().includes(search.toLowerCase()) ||
          todo.body.toLowerCase().includes(search.toLowerCase())
      )
      if (isSorted) {
        result = [...result].sort((a, b) => a.title.localeCompare(b.title))
      }
      return { ...state, displayedItems: result }
    }

    default: 
    return state;
  }
}