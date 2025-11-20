import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'
import { server } from '../../bff'
import { useState } from 'react'
import { Input, Button } from '../components'
import { Link, Navigate } from 'react-router'
import { setUser } from '../actions'
import {useDispatch, useSelector} from 'react-redux'
import { selectUserRole } from '../selectors'
import { ROLE } from '../../constants'
import { useResetForm } from '../hooks'


{/*.max(15, 'Login is not correct. Max 15 symbols'),
  .min(3, 'Login is not correct. Min 3 symbols'),*/}
const authFormSchema = yup.object().shape({
  login: yup.string()
    .required('Insert email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Login is not correct')
    .email('Email is not correct'),
    

  password: yup.string()
    .required('Insert password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, 'Password is not correct')
    .min(6, 'Password is not correct. Min 6 symbols')
    .max(30, 'Password is not correct. Max 30 symbols')
})

  const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

    .register-link{
      margin-top: 20px;
      font-size: 18px;
      &:hover {text-decoration: underline;}
    }
  `;

  const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const ErrorMessage = styled.div `
    width: 100%;
    margin-top: 15px;
    font-size: 18px;
    padding: 10px;
    border-radius: 15px;
    background-color: #fd7d7d;

  `;

  const AuthorizationContainer = ({className}) => {


    const [serverError,setServerError] = useState(null)
    const dispatch = useDispatch()
    const roleId = useSelector(selectUserRole)
    

  const {
    register,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      login: '',
      password: ''
    },
    resolver: yupResolver(authFormSchema)
  })

  const onSubmit = ({login,password}) =>{
    server.authorize(login,password)
      .then(({error, res})=>{
        if(error) {
          setServerError(`Request error ${error}`)
          return;
        }
        dispatch(setUser(res));
        sessionStorage.setItem('userData',JSON.stringify(res))
      })
  }

  useResetForm(reset)
  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  if(roleId !== ROLE.GUEST) {
    return <Navigate to="/" />
  }

  return(
    <>
    <div className={className}>
      <AuthContainer>
        <h2>Log In</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input type='text'placeholder='Log In' {...register('login', {
            onChange: ()=> setServerError(null),
          })}/>
          <Input type='text'placeholder='Password' {...register('password', {
            onChange: ()=> setServerError(null)
          })}/>
          <Button type='submit' disabled={!!formError} width="220px" >Log In</Button>
        </Form>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <div className='register-link'>
          <Link to='/register' >Register</Link>
        </div>
      </AuthContainer>
    </div>
    </>
  )
}

export const Authorization = styled(AuthorizationContainer)`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;