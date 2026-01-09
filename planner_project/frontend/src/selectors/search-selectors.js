import { createSelector } from 'reselect';

// 1️⃣ Состояние доски

export const selectTaskState = state => state.tasks;

export const selectAllTasks = state => state.tasks.all || [];

// 6️⃣ Поисковый запрос
export const selectSearchQuery = state => state.search.query || '';

// 7️⃣ Фильтрация задач по глобальному поиску
export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectSearchQuery],
  (tasks, query) => {
    if (!tasks) return [];
    if (!query.trim()) return tasks;
    return tasks.filter(task =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );
  }
);