import styled from "styled-components";
import Container from "@mui/material/Container";
import { Authorization } from "../login/authorization";
import { useSelector } from "react-redux";
import { MyBoardsLink } from "./components/myBoardsLink";





const MainPageContainer = ({className}) => {

  const isAuth = useSelector(state => state.user.isAuth);

  return(
    <>
    <div className={className}>
      <Container  >
      <div className="title">
        <h1>A Kanban planner for work without chaos</h1>
      </div>
      <div className="login-form">
        <div className="form">
          {isAuth ? <MyBoardsLink /> :<Authorization  /> }
          
        </div>
        <div className="form-image">
          <img className="img-block" src="/main-page.jpeg" alt="" />
        </div>
      </div>
      </Container>
      <div className="about-wrapper">
      <Container>
        <div className="about">
          <div className="description">
            <h3>Customize your work flows</h3>
            <p>Create boards, manage tasks,<br /> and track progress in real time.</p>
          </div>
          <div className="about-image">
            <img  className="about-img" src="/about-img.png" alt="" />
          </div>
      </div>
      </Container>
      </div>
    </div>
    </>
  )
}

export const MainPaige = styled(MainPageContainer)`
margin-top: 100px;
width: 100%;

  .title{
    text-align: center;
    color: #172B4D;
    font-size: 28px;
    font-weight: 500;
  }
  .login-form{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
  }
  .form {
    width: 400px;
    height: 450px;
  }
  .form-image{
    width: 680px;
    overflow: hidden;
    border-radius: 8px;
  }
  .img-block{
    width: 700px;
    height: auto;
    object-fit: contain;
    display: block;
    background-color: white;
  }
  .about-wrapper{
    margin-top: 100px;
    background-color: #cfe1fd;
  }
  .about{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 20px;
  }
  .description{
    & h3{
      font-size: 36px;
    }
    font-size: 20px;
    margin-top: 20px;
    margin-right: 15px;
  }
  .about-image{
    margin-top: 40px;
    
  }
  .about-img{
    width: 580px;
    height: auto;
    border-radius: 8px;
  }
`;