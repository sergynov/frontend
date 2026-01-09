import {Routes, Route} from 'react-router-dom'
import { Header } from './components'
import { About,  Authorization, Registration, MyBoards} from './components/pages';
import { MainPaige } from './components/pages';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './actions/check-auth';
import styled from 'styled-components'
import { Board } from './components/board/board.jsx';
import { useSelector } from 'react-redux';
import { fetchAllTasks } from './actions/fetch-all-tasks.js';

const AppContainer = styled.div `
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
  //max-width: 1300px;
  width:100%;
  background-color: white;
`;

export const App = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)

  useEffect(()=>{
    dispatch(checkAuth())
  }, [dispatch])

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchAllTasks());
    }
  }, [isAuth, dispatch]);


  return(
    <>
      <AppContainer>
      <Header />
      <Routes>
        <Route path='/' element={<MainPaige />} />
        <Route path='/login' element={<Authorization $margin="100px 0 0 0" />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/boards' element={<MyBoards />} />
        <Route path='/boards/:id' element={<Board />} />
        <Route path='/account' element={<div>Account Page</div>} />
        <Route path='/about' element={<About />} />
      </Routes>
      </AppContainer>
    </>
  )
}