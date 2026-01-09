import { request } from "../components/utils/server-request";
import { URL } from "../constants/url";
import { deleteTask } from "./delete-task";

export const deleteTaskAsync = (taskId) => async (dispatch) => {
  try {
    await request(`${URL}/tasks/${taskId}`, 'DELETE')
    dispatch(deleteTask(taskId))
  } catch (e) {
    throw new Error(e);
  }
}