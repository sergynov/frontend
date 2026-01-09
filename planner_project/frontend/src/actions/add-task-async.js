import { request } from "../components/utils/server-request";
import { URL } from "../constants/url";
import { addTask } from "./add-task";

export const addTaskAsync = (columnId,title) => async (dispatch, getState) => {
  try {
    const { tasks } = getState().board;

    // все задачи в колонке
    const columnTasks = tasks.filter(t => t.columnId === columnId);

    // вычисляем максимальный order
    const maxOrder = columnTasks.length
      ? Math.max(...columnTasks.map(t => t.order))
      : -1;
    const res = await request(`${URL}/columns/${columnId}/tasks`, 'POST',{title, order: maxOrder + 1})
    dispatch(addTask(res.data))
  } catch (e) {
    throw new Error(e);
  }
}