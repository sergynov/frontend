import styled from "styled-components";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router";
import { fetchBoard, updateColumnAsync, clearBoard, moveTaskAsync, moveColumnAsync} from '../../actions'
import { Column } from "./components/column";
import { BoardHeader } from "./components/boardHeader";
import Box from '@mui/material/Box';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { selectBoardTasksByColumn, selectSortedColumns} from "../../selectors";


const BoardContainer = ({className}) => {

  const dispatch = useDispatch()
  const {board} = useSelector(state => state.board)
  const columns = useSelector(selectSortedColumns);
  const tasksByColumn = useSelector(selectBoardTasksByColumn);
  const {id} = useParams()


  useEffect(()=> {
    dispatch(clearBoard());
    dispatch(fetchBoard(id))
  },[dispatch,id])

  if (!board) return <div>Loading...</div>;

//изменить имя колонки
const handleRenameColumn = (columnId, newTitle) => { 
  dispatch(updateColumnAsync(columnId, newTitle));
};

//Drag&Drop
  const onDragEnd = (result) => {
    const { source, destination, type, draggableId } = result;

    if (!destination) return;


    // колонки
    if (type === 'COLUMN') {
      dispatch(moveColumnAsync({
        columnId: draggableId,
        toIndex: destination.index
      }));
      return;
    }
    if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }

    // задачи
    dispatch(moveTaskAsync({
    taskId: draggableId,
    fromColumn: source.droppableId,
    toColumn: destination.droppableId,
    toIndex: destination.index
  }));
  };


  return(
    <>
    <div className={className}>
      
        <Box sx={{ background: 'linear-gradient(135deg, #123263, #803FA5)', height: '100vh',width: '100%' }} >
        <BoardHeader board={board} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="columns"
              >
                {columns.map((column, index) => {
                  
                  return (
                  <Draggable
                      key={column.id}
                      draggableId={column.id.toString()}
                      index={index}
                    >
                    {(provided) => (
                          <div  ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}>
                        
                    <Column
                      key={column.id}
                      column={column}
                      index={index}
                      tasks={tasksByColumn[column.id.toString()] || []}
                      onRenameColumn={handleRenameColumn}
                    />
                  
                  </div>
                    )}
                </Draggable> );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </div>
    </>
  )
}

export const Board = styled(BoardContainer)`
  
  .columns {
    display: flex;
    padding: 16px;
    gap: 10px;
    align-items: flex-start;
  }

`;

{/*
  <div className="board">
        <div className="board-title">
          {isEditing ? (
                    <Input
                      type="text"
                      $margin="10px 0 10px 25px"
                      value={title}
                      autoFocus
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={handleSave}
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    <>
                    <h2 className="title">{board.title}</h2>
                    <IconButton
                      className="edit-icon"
                      size="small"
                      onClick={() => setIsEditing(true)}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    </>
                  )}
        </div>
        <Button className="add-button" variant="contained" startIcon={<AddOutlinedIcon/>} onClick={handleAddColumn}>Add new column</Button>
      </div>


 // задачи
    dispatch(moveTask({
      taskId: draggableId,
      fromColumn: source.droppableId,
      toColumn: destination.droppableId,
      fromIndex: source.index,
      toIndex: destination.index
    }));


    const columnTasks = filteredTasks
                      .filter(t => t.columnId === column.id)
                      .sort((a, b) => a.order - b.order);

  */}