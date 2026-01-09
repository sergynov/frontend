import { ACTION_TYPE } from "./action-types";


export const moveColumn = (payload) => ({
  type: ACTION_TYPE.MOVE_COLUMN,
  payload
});