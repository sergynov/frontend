import { ACTION_TYPE } from "./action-types";

export const deleteTask = (task) => ({
  type: ACTION_TYPE.DELETE_TASK,
  payload: task
})