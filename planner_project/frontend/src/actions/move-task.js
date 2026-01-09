import { ACTION_TYPE } from "./action-types";

export const moveTask = (payload) => ({
  type: ACTION_TYPE.MOVE_TASK,
  payload
});