import { request } from "../components/utils/server-request";
import { URL } from "../constants/url";
import { updateTask } from "./update-task";

export const updateTaskAsync = (taskId,data) => async (dispatch) => {
  try {
    const res = await request(`${URL}/tasks/${taskId}`, 'PATCH', data)
    dispatch(updateTask(res.data))
  } catch (e) {
    throw new Error(e);
  }
}