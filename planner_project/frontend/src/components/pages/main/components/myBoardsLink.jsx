import styled from "styled-components"
import { Link } from "react-router";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MyBoardsLinkContainer = ({className}) => {

  return(
    <>
    <div className={className}>
      <div className="container">
        <div className="title">
          <h4>Manage your work</h4>
        </div>
        <div className="content">
          <div className="text-content">
            <p>Access all your Kanban boards in one place and keep your work organized.</p>
          </div>
          <Link to='/boards'>
          <Button  variant="contained" endIcon={<ArrowForwardIosIcon/>}>Go to boards</Button>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export const MyBoardsLink = styled(MyBoardsLinkContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${({ $margin }) => $margin || 0};

  .container{
    width: 400px;
    height: 450px;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 0px 1px 4px 3px rgba(0, 0, 0, 0.1);
  }
  .content{
    text-align: center;
  }
  .text-content{
    padding: 10px;
    font-size: 20px;

  }
`;