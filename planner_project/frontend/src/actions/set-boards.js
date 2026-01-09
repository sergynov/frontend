import { ACTION_TYPE } from "./action-types";

export const setBoards = (boardsData) => ({
  type: ACTION_TYPE.SET_BOARDS,
  payload: boardsData
})