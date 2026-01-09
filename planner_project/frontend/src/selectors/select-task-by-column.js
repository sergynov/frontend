import { createSelector } from 'reselect';

const selectTasks = state => state.board.tasks;

export const selectTasksByColumn1 = createSelector(
  [selectTasks],
  (tasks) => {
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


  {/* export const makeSelectTasksByColumn = () =>
  createSelector(
    [selectTasks, (_, columnId) => columnId],
    (tasks, columnId) =>
      tasks
        .filter(t => t.columnId === columnId)
        .sort((a, b) => a.order - b.order)
  );*/}