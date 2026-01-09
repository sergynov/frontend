import { createSelector } from 'reselect';

export const selectTasksForBoard = boardId =>
  createSelector(
    [state => state.board.tasks],
    tasks => tasks.filter(t => t.boardId === boardId)
  );