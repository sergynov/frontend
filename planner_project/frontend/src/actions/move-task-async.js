import { ACTION_TYPE } from "./action-types";
import { updateTaskAsync } from "./update-task-async";


export const moveTaskAsync = ({ taskId, fromColumn, toColumn, toIndex }) => async (dispatch, getState) => {
  // 1️⃣ Обновляем Redux сразу
  dispatch({
    type: ACTION_TYPE.MOVE_TASK,
    payload: { taskId, fromColumn, toColumn, toIndex }
  });

  // 2️⃣ Берём актуальное состояние
  const { tasks } = getState().board;

  // 3️⃣ Список колонок, которые нужно обновить
  const columnsToUpdate = [fromColumn, toColumn];

  for (const columnId of columnsToUpdate) {
    const columnTasks = tasks
      .filter(t => t.columnId.toString() === columnId.toString())
      .sort((a, b) => a.order - b.order);

    for (const task of columnTasks) {
      // сохраняем на сервер
      await dispatch(updateTaskAsync(task.id, {
        columnId: task.columnId,
        order: task.order
      }));
    }
  }
};