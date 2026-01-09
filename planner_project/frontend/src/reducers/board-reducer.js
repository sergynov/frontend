import { ACTION_TYPE } from "../actions";
import { mergeTasks } from "../helpers/merge-task";

const initialState = {
  board: null,
  list: [],
  columns: [],
  tasks: [],
  search: '',
  loading: false,
  error: null
}

export const boardReducer = (state=initialState, action) => {
  switch(action.type){

    case ACTION_TYPE.SET_BOARD: {
      return {
        ...state,
        board: action.payload.board,
        columns: action.payload.columns,
        tasks: mergeTasks(state.tasks, action.payload.tasks),
        loading: false,
        error: null
      }
    }

    case ACTION_TYPE.SET_BOARDS:
      return {
        ...state,
        list: action.payload
      };

    case ACTION_TYPE.UPDATE_BOARD:
      return {
        ...state,
        board: action.payload,
        list: state.list.map(b =>
          b.id === action.payload.id ? action.payload : b
    )
  };

    case ACTION_TYPE.CLEAR_BOARD:
      return {
        ...state,
        board: null,
        columns: []
      }

    case ACTION_TYPE.ADD_BOARD:
      return {
        ...state, 
        list: [...(state.list || []), action.payload] 
      };
    
    case ACTION_TYPE.DELETE_BOARD:
      return {
        ...state,
        list: state.list.filter(board => board.id !== action.payload),
        board: null,
        columns: [],
        tasks: []
      }

    case ACTION_TYPE.ADD_COLUMN:
      return {
        ...state,
        columns: [...state.columns, action.payload]
      };

    case ACTION_TYPE.UPDATE_COLUMN:
      return {
        ...state,
        columns: state.columns.map(c =>
          c.id === action.payload.id ? action.payload : c
        )
      };

    case ACTION_TYPE.DELETE_COLUMN:
      return {
        ...state,
        columns: state.columns.filter(c => c.id !== action.payload),
        tasks: state.tasks.filter(t => t.columnId !== action.payload)
      };

    case ACTION_TYPE.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };

    case ACTION_TYPE.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(t =>
      t.id === action.payload.id
        ? { ...t, ...action.payload }
        : t
        ),
      };

    case ACTION_TYPE.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload)
      };

    case ACTION_TYPE.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTION_TYPE.SET_ERROR:
      return { ...state, error: action.payload };

    case ACTION_TYPE.SET_SEARCH:
      return {
        ...state,
        search: action.payload
      }

    case ACTION_TYPE.MOVE_TASK: {
      const { taskId, fromColumn, toColumn, toIndex } = action.payload;

      const tasks = [...state.tasks];
      const movedTask = tasks.find(t => t.id.toString() === taskId);
      if (!movedTask) return state;
      let withoutMoved = tasks.filter(t => t.id.toString() !== taskId);

      if (fromColumn === toColumn) {// если перемещение внутри одной колонки
        
        const columnTasks = withoutMoved
          .filter(t => t.columnId.toString() === toColumn)
          .sort((a, b) => a.order - b.order);

        columnTasks.splice(toIndex, 0, { ...movedTask, columnId: toColumn });

        const updatedColumnTasks = columnTasks.map((t, i) => ({ ...t, order: i }));

        // остальные задачи
        const rest = withoutMoved.filter(t => t.columnId.toString() !== toColumn);

        return {
          ...state,
          tasks: [...rest, ...updatedColumnTasks]
        };
      } else 
        {// если перемещение между колонками
        const sourceTasks = withoutMoved
          .filter(t => t.columnId.toString() === fromColumn)
          .sort((a, b) => a.order - b.order)
          .map((t, i) => ({ ...t, order: i }));

        const targetTasks = withoutMoved
          .filter(t => t.columnId.toString() === toColumn)
          .sort((a, b) => a.order - b.order);

        targetTasks.splice(toIndex, 0, { ...movedTask, columnId: toColumn });

        const updatedTarget = targetTasks.map((t, i) => ({ ...t, order: i }));

        const rest = withoutMoved.filter(
          t => t.columnId.toString() !== fromColumn && t.columnId.toString() !== toColumn
        );

        return {
          ...state,
          tasks: [...rest, ...sourceTasks, ...updatedTarget]
        };
      }
}
    

    case ACTION_TYPE.MOVE_COLUMN: {
      const { columnId, toIndex } = action.payload;
      const columns = [...state.columns];
      const fromIndex = columns.findIndex(c => c.id === columnId);

      // удаляем колонку с текущей позиции
      const [moved] = columns.splice(fromIndex, 1);
      // вставляем на новую позицию
      columns.splice(toIndex, 0, moved);

      // обновляем order локально
      const updatedColumns = columns.map((col, idx) => ({ ...col, order: idx }));

      return {
        ...state,
        columns: updatedColumns
      };
    }

    default:
      return state;
  }
}