import { MAKE_MOVE, SET_CURRENT_PLAYER,SET_DRAW,SET_GAME_FIELD,SET_WINNER_PLAYER,RESTART_GAME } from "./actions/actions";

const emptyField = () => [
    [' ',' ',' ',],
    [' ',' ',' ',],
    [' ',' ',' ',],
  ]

export const initialState = {
  gameField: emptyField(),
  currentPlayer: 'X',
  isGameEnded: false,
  isDraw:false,
  winnerPlayer: null
};

export const appReducer = (state = initialState, action)=> {

  const {type,payload} = action;

  switch (type) {

    case MAKE_MOVE: {
      const {rowIndex,cellIndex } = action.payload;
        if(state.isGameEnded || state.gameField[rowIndex][cellIndex] !== ' ') {return state};

    const updatedField = state.gameField.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === cellIndex ? state.currentPlayer : cell
      )
    )
    return {
        ...state,
        gameField: updatedField,
        currentPlayer: state.currentPlayer === 'X' ? '0' : 'X'
      }
    }
    

    case SET_CURRENT_PLAYER:
    return {...state, currentPlayer: payload}

    case SET_GAME_FIELD:
      return {...state, gameField: payload}

    case SET_WINNER_PLAYER:
      return{...state, isGameEnded:true, winnerPlayer: payload}

    case SET_DRAW:
      return{...state, isGameEnded:true, isDraw: true}

    case RESTART_GAME:
      return initialState;

    default:
      return state;
  }

}

{/*export const makeMove = (rowIndex, cellIndex) => ({
  type: 'MAKE_MOVE',
  payload: { rowIndex, cellIndex },
}); */}