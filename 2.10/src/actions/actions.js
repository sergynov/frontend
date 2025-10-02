export const MAKE_MOVE = 'MAKE_MOVE'
export const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER'
export const SET_DRAW = 'SET_DRAW'
export const SET_GAME_FIELD = 'SET_GAME_FIELD'
export const SET_WINNER_PLAYER = 'SET_WINNER_PLAYER'
export const RESTART_GAME = 'RESTART_GAME'

export const makeMoveAction = (rowIndex, cellIndex) => ({
  type: 'MAKE_MOVE',
  payload: { rowIndex, cellIndex },
});

export const setCurrentPlayerAction = (player) => ({
  type: 'SET_CURRENT_PLAYER',
  payload: player
})

export const setDrawAction = () => ({
  type: 'SET_DRAW',
})

export const setGameFieldAction = (field) => ({
  type: 'SET_GAME_FIELD',
  payload: field
})

export const setWinnerPlayerAction = (player) => ({
  type: 'SET_WINNER_PLAYER',
  payload: player
})

export const restartGameAction = () => ({
  type: 'RESTART_GAME'
})