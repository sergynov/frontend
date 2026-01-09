import { createSelector } from 'reselect';

// 1️⃣ Состояние доски
export const selectBoardState = state => state.board;
export const selectTaskState = state => state.tasks;

// 2️⃣ Колонки и задачи текущей доски
export const selectColumns = createSelector(
  [selectBoardState],
  boardState => boardState.columns || []
);

export const selectBoardTasks = createSelector(
  [selectBoardState],
  boardState => boardState.tasks || []
);

// 3️⃣ Сортировка колонок по order
export const selectSortedColumns = createSelector(
  [selectColumns],
  columns => [...columns].sort((a,b) => a.order - b.order)
);

// 4️⃣ Группировка задач доски по колонкам
export const selectBoardTasksByColumn = createSelector(
  [selectBoardTasks],
  tasks => {
    const map = {};
    tasks.forEach(task => {
      const columnId = task.columnId.toString();
      if (!map[columnId]) map[columnId] = [];
      map[columnId].push(task);
    });
    Object.values(map).forEach(arr => arr.sort((a,b) => a.order - b.order));
    return map;
  }
);