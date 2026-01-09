import { ACTION_TYPE } from "./action-types";

export const addColumn = (column) => ({
  type: ACTION_TYPE.ADD_COLUMN,
  payload: column
})