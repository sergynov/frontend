import { ACTION_TYPE } from "./action-types";

export const updateColumn = (column) => ({
  type: ACTION_TYPE.UPDATE_COLUMN,
  payload: column
})