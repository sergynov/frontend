import { ACTION_TYPE } from "./action-types";

export const createBoard = (board) => ({
  type: ACTION_TYPE.ADD_BOARD,
  payload: board
})