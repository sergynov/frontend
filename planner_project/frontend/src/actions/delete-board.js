import { ACTION_TYPE } from "./action-types";

export const deleteBoard = (boardId) => ({
  type: ACTION_TYPE.DELETE_BOARD,
  payload: boardId
})