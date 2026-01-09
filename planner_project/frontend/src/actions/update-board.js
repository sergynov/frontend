import { ACTION_TYPE } from "./action-types";

export const updateBoard = (board) => ({
  type: ACTION_TYPE.UPDATE_BOARD,
  payload: board
})