import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createBoardAsync } from "../../../../actions/create-board-async";
import { useEffect } from "react";
import { fetchAllBoards } from "../../../../actions/fetch-all-boards";
import { BoardCard } from "../../../board/components/boardCard";
import Container from "@mui/material/Container";
import { MainPaige } from "../mainPage";
import { Button } from "@mui/material";
import { CreateBoardModal } from "../../../header/components/createModal";



const MyBoardsContainer = ({className}) => {
  const boards = useSelector(state => state.board.list);
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth);
  const allBoards = useSelector(state => state.board.list);
  const [open,setOpen] = useState(false)

  useEffect(()=>{
      if(isAuth){
      dispatch(fetchAllBoards())
      }
    }, [dispatch, isAuth])

    if(!isAuth) {
    return <MainPaige />
  }

  
  const handleCreate =  (title) => {
      dispatch(createBoardAsync(title));

  };
  
  if (boards.length === 0) {
    return (
      <div>
        <Container>
      <h2>No boards yet</h2>
      <h2 style={{color:"#44546F"}}>Create your first board to get started</h2>
      <Button variant="contained"  onClick={()=>setOpen(true)}>Create board</Button>
      <CreateBoardModal open={open} onClose={() => setOpen(false)} onSubmit={handleCreate} />
        </Container>
    </div>
  );
}
    
  return(
    <>
    <div className={className}>
      <Container maxWidth="md">
        <div className="main-container">
        <div className="title">
          <h2>My boards</h2>
        </div>
        <div className="board-list">
          {allBoards.map(board => (
            <BoardCard board={board} key={board.id} className="board-item" />
          ))}
        </div>
        </div>
      </Container>
    </div>
    </>
  )
}
export const MyBoards = styled(MyBoardsContainer)`
display: flex;
align-items: center;
.main-container {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}
.board-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;     
  gap: 16px; 
}
`;