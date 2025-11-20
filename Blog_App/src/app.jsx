import {Routes, Route} from 'react-router-dom'
import { Header } from './components/header/components/header';
import { Footer } from './components/footer/components/footer';
import { Authorization, Registration, Users, Post, MainPage } from './pages';
import styled from 'styled-components'
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './actions';
import { ERROR } from '../bff/constants';
import { Modal, Error} from './components';

const Page = styled.div ``;

const AppContainer = styled.div `
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1300px;
  background-color: white;
`;


export const App = () => {
  const dispatch = useDispatch()

  useLayoutEffect(()=>{
    const currentUserDataJSON = sessionStorage.getItem('userData')

    if(!currentUserDataJSON) {
      return;
    }
    const currentUserData = JSON.parse(currentUserDataJSON)

    dispatch(
      setUser({
        ...currentUserData,
        roleId: Number(currentUserData.roleId)
    }))
  },[dispatch])

  return(
    <>
    <AppContainer>
    <Header />
    <Page>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<div><Authorization /></div>} />
        <Route path='/register' element={<div><Registration /></div>} />
        <Route path='/users' element={<div><Users /></div>} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/post/:id/edit' element={<Post />} />
        <Route path='/post/:id/*' element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
        <Route path='/post' element={<Post />} />
        <Route path='/' element={<MainPage />} />
        <Route path='*' element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
      </Routes>
    </Page>
    <Footer />
    <Modal />
    </AppContainer>
</>
  );
};