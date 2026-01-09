import { ACTION_TYPE } from "./action-types";

export const updateTask = (task) => ({
  type: ACTION_TYPE.UPDATE_TASK,
  payload: task
})