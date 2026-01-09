import { ACTION_TYPE } from "./action-types";

export const deleteColumn = (column) => ({
  type: ACTION_TYPE.DELETE_COLUMN,
  payload: column
})