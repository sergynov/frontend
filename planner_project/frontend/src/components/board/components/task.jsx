import styled from "styled-components";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteTaskAsync, updateTaskAsync } from "../../../actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Input } from "../../input/input";

const TaskContainer = ({className, task}) => {

  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)

  useEffect(() => {
  if (task) {
    setTitle(task.title);
  }
}, [task]);

  const handleDelete = () => {
    dispatch(deleteTaskAsync(task.id));
  };

  const handleEdit = () => {
    setIsEditing(true)
  };

  const renametask = (taskId, newTitle) => { 
    dispatch(updateTaskAsync(taskId, newTitle));
  };

  const handleSave = () => {
    if (title.trim() && title !== task.title) {
      renametask(task.id, {title:title.trim()});
    }
    setIsEditing(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setTitle(task.title);
      setIsEditing(false);
    }
  };

  return (
    <>
    <div className={className}>
      <div className="task-title">
        {isEditing ? (
                  <Input
                    $margin="10px 10px 0 0"
                    type="text"
                    value={title}
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                  />
                ) : (
                  <div className="task-item">
                    <div className="title-div">
                    {task.title}
                    </div>
                    <div className="task-edit">
                    <IconButton onClick={handleEdit} sx={{p:0}}>
                    <EditOutlinedIcon/>
                      </IconButton>
                        <IconButton onClick={handleDelete}>
                        <DeleteOutlineIcon/>
                      </IconButton>
                  </div>
                  </div>
                )}
      </div>
    </div>
    </>
  )
}

export const Task = styled(TaskContainer)`
  display: flex;
  justify-content: space-between;
  min-height: 35px;
  background-color: white;
  border: 1px solid grey;
  border-radius: 5px;
  margin-bottom: 10px;
  .task-item{
    display: flex;

    flex-direction: row;
    align-items: center;
    
  }
  .title-div{
    flex-grow: 1;
  }
  .task-title{
    font-size: 18px;
    padding: 5px;

  }
  .task-edit {
    display: flex;
    background-color: white;
    opacity: 0;
    transition: opacity 0.2s ease;
    margin-left: 20px;

}
  .task-edit:hover  {
    background-color: white;
  opacity: 1;
  cursor: pointer;
}
`;