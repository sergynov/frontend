import styled from "styled-components";
import { useState } from "react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Button from "@mui/material/Button";
import { Input } from '../../input/input'
import { addTaskAsync, deleteColumnAsync } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "./task";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ListItemIcon from "@mui/material/ListItemIcon";
import { IconButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
//import { selectTasks } from "../../../selectors";
//import { useMemo } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { selectBoardTasksByColumn } from "../../../selectors";


const ColumnContainer = ({className, column,  onRenameColumn, dragHandleProps}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(column.title)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //const selectColumnTasks = useMemo(makeSelectTasksByColumn, []);

 { /*// ⚠️ useSelector использует мемоизированный селектор
  const columnTasks = useSelector(state =>
    selectColumnTasks(state, column.id)
  );*/}

  const tasksByColumn = useSelector(selectBoardTasksByColumn);
const columnTasks = tasksByColumn[column.id.toString()] || [];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
  setIsEditing(true);
  handleClose();
  };
  const handleDelete = () => {
    dispatch(deleteColumnAsync(column.id));
    handleClose();
  };

  const handleSave = () => {
    if (title.trim() && title !== column.title) {
      onRenameColumn(column.id, {title:title.trim()});
    }
    setIsEditing(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setTitle(column.title);
      setIsEditing(false);
    }
  };

  const handleAddTask = () => {
  const title = prompt('Enter task title');
  if (!title) return;

  dispatch(addTaskAsync(column.id, title));
};

  return(

    <div className={className}>
      <div className="column-title" {...dragHandleProps}> 
        {isEditing ? ( 
          <Input 
            $margin="10px 10px 0 0" 
            type="text" 
            value={title} 
            autoFocus 
            onChange={(e) => setTitle(e.target.value)} 
            onBlur={handleSave} 
            onKeyDown={handleKeyDown} />
            ) : (
                <h3>{column.title}</h3>
                )}
                {!isEditing && ( 
                  <> 
                  <div className="edit-menu"> 
                    <Button id="demo-positioned-button" 
                      aria-controls={open ? 'demo-positioned-menu' : undefined} 
                      aria-haspopup="true" aria-expanded={open ? 'true' : undefined} 
                      onClick={handleClick} > <MoreHorizIcon /> 
                    </Button> 
                    <Menu id="demo-positioned-menu" 
                      aria-labelledby="demo-positioned-button" 
                      anchorEl={anchorEl} 
                      open={open} 
                      onClose={handleClose} 
                      anchorOrigin={{ vertical: 'top', horizontal: 'left', }} 
                      transformOrigin={{ vertical: 'top', horizontal: 'left', }} > 
                    <MenuItem onClick={handleEdit} > 
                      <ListItemText>Edit</ListItemText> 
                      <ListItemIcon> <EditOutlinedIcon/> </ListItemIcon> 
                    </MenuItem> 
                    <MenuItem onClick={handleDelete}> 
                      <ListItemText>Delete</ListItemText> 
                      <ListItemIcon> 
                        <DeleteOutlineIcon/> 
                      </ListItemIcon> 
                    </MenuItem> 
                    </Menu> 
                    </div> 
                    </> 
                  )}
            </div> 

          <Droppable droppableId={column.id.toString()} type="TASK">
            {(provided) => (
          <div className="tasks"> 
            <div className="task-list" 
              ref={provided.innerRef} // ✅ единственный ref для Droppable
              {...provided.droppableProps}> 

              {columnTasks.map((task,index) => 
              <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef} // ✅ единственный ref для Draggable
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >

              <Task  task={task} />
              </div>
                      )}
                    </Draggable>
                  )}

                  {provided.placeholder}
                </div>
              </div>
              ) } 
          </Droppable>
              <Button className="add-task-btn" 
                variant="text" 
                size="small" 
                startIcon={<AddOutlinedIcon/>} 
                onClick={handleAddTask}> Add new task</Button> 
            </div> 
    ) }
    


export const Column = styled(ColumnContainer)`
  display: flex;
  flex-direction: column;
  width: 280px;
  min-height: 70px;
  height: auto;
  background-color: #f4f5f7;
  border-radius: 8px;
  padding: 12px;
  margin-right: 12px;

  .column-title {
    display: flex;
    justify-content: space-between;
    margin-left: 12px;
  }
  .edit-menu{
    margin-top: 12px;
  }
.tasks {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.add-task-btn{
  margin-top: auto;
}
  .task-list {
    flex-grow: 1;
  }
  
  `;

  {/*<IconButton
          className="edit-icon"
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={() => setIsEditing(true)}
        >
          <EditOutlinedIcon />
        </IconButton> */}