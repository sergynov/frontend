import styled from "styled-components"
import { Link } from "react-router";

const BoardCardContainer = ({className, board}) => {

  return(
    <>
    <div className={className}>
      
      <Link to={`/boards/${board.id}`}>
      <div className="wrapper">
      <div className="board-title">
        {board.title}
      </div>
      </div>
      </Link>
    </div>
    </>
  )
}

export const BoardCard = styled(BoardCardContainer)`
  margin-right: 20px;
  width: 200px;
  height: 110px;
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(9,30,66,0.08);
  background: linear-gradient(45deg, #2a466f, #804ff0);
  :hover {
    background-color: #c2bdbd;
  }
  .wrapper{
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .board-title{
  font-size: 20px;
  font-weight: 600;
  color: white;
  text-align: left;
  padding: 5px;
}
`;