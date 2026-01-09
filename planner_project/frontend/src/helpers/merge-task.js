export const mergeTasks = (oldTasks, newTasks) => {
  const map = {};

  [...oldTasks, ...newTasks].forEach(task => {
    map[task.id] = task;
  });

  return Object.values(map);
};