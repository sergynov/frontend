import { request } from "../components/utils/server-request";
import { URL } from "../constants/url";
import { ACTION_TYPE } from "./action-types";

export const fetchAllTasks = () => async dispatch => {
  try {
      const tasks = await request(`${URL}/tasks`, 'GET',)
      dispatch(
        {
    type: ACTION_TYPE.SET_ALL_TASKS,
    payload: tasks.data
        }
      )
    } catch (e) {
      throw new Error(e);
    }
};