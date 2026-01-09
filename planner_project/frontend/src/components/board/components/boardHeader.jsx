import styled from "styled-components"
import { useState,useEffect } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { IconButton, ThemeProvider, createTheme  } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button from "@mui/material/Button";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteBoardAsync } from "../../../actions";
import { Input } from "../../input/input";
import { updateBoardAsync, addColumnAsync } from "../../../actions";


const BoardHeaderContainer = ({className, board}) =>{
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
  if (board) {
    setTitle(board.title);
  }
}, [board]);

  const handleDeleteBoard = () => {
  if (window.confirm('Delete this board?')) {
    dispatch(deleteBoardAsync(board.id))
    navigate('/')
  }
}
  const handleAddColumn = () => {
    const title = prompt('Enter column title');
    if (!title) return;
  
    dispatch(addColumnAsync(board.id, title));
  };

  //изменить имя доски
  const handleRenameBoard = (boardId, newTitle) => {
    dispatch(updateBoardAsync(boardId, newTitle));
  };

  const handleSave = () => {
    if (title.trim() && title !== board.title) {
      handleRenameBoard(board.id, {title:title.trim()});
    }
    setIsEditing(false);
  };
  const theme = createTheme({
  palette: {
    primary: {
      main:'#f2f5f2'
    }

  },
});

const handleKeyDown = (e) => { //сохранить по нажатию enter
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setTitle(board.title);
      setIsEditing(false);
    }
  };

  return(
    <>
    <div className={className}>
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
        <div className="header-buttons">
          <ThemeProvider theme={theme} >
          <Button className="add-button"  startIcon={<AddOutlinedIcon/>} onClick={handleAddColumn}>Add new column</Button>
          <Button className="delete-button" startIcon={<DeleteOutlineIcon/>} onClick={handleDeleteBoard}>Delete board</Button>
          </ThemeProvider>
        </div>

        </div>
    </>
  )
}

export const BoardHeader = styled(BoardHeaderContainer)`
  display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(135deg, #112a4f, #612f7e);
  .title {
    color: white;
    margin-left: 20px;
  }
  .header-buttons{
    margin-right: 15px;
  }
  .add-button {
    margin-right: 15px;
  }
  .board-title{
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .board-title:hover .edit-icon {
    background-color: white;
    opacity: 1;
    cursor: pointer;
}
  .edit-icon {
    background-color: white;
    opacity: 0;
    transition: opacity 0.2s ease;
}
`;