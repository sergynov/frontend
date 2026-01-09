import { ACTION_TYPE } from "./action-types";

export const addTask = (task) => ({
  type: ACTION_TYPE.ADD_TASK,
  payload: task
})