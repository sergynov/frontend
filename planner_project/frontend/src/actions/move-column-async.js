import { ACTION_TYPE } from "./action-types";
import { updateColumnAsync } from "./update-column-async";

export const moveColumnAsync =
  ({ columnId, toIndex }) =>
  async (dispatch, getState) => {

    // 1️⃣ Сначала локально обновляем Redux store
    dispatch({
      type: ACTION_TYPE.MOVE_COLUMN,
      payload: { columnId, toIndex }
    });

    // 2️⃣ Берём актуальное состояние колонок
    const { columns } = getState().board;

    // 3️⃣ Сортируем колонки по текущему order
    const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

    // 4️⃣ Обновляем order для всех колонок после перемещения
    sortedColumns.forEach((col, index) => {
      col.order = index;
    });

    // 5️⃣ Сохраняем на сервер каждую колонку через updateColumnAsync
    for (const col of sortedColumns) {
      await dispatch(
        updateColumnAsync(col.id, { order: col.order })
      );
    }
  };