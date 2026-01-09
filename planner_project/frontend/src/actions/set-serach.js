import { ACTION_TYPE } from "./action-types";

export const setSearch = (value) => ({
  type: ACTION_TYPE.SET_SEARCH,
  payload: value
})