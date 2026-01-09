
const initialState = {
  query: ''
};

export const setSearchQuery = (query) => ({
  type: 'SET_SEARCH_QUERY',
  payload: query
});

export const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, query: action.payload };
    default:
      return state;
  }
};