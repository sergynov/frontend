import { ACTION_TYPE } from "./action-types";

export const setBoard = (boardData) => ({
  type: ACTION_TYPE.SET_BOARD,
  payload: boardData
})