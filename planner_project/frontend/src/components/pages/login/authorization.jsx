import styled from "styled-components";
import { Logo } from "../../header/components/logo";
import Button from '@mui/material/Button';
import { Input } from "../../input/input";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useResetForm } from "../../../hooks";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../actions";
import { Link, useNavigate } from "react-router";


  const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

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
    const navigate = useNavigate()
    

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

  const onSubmit =  ({login,password}) =>{
    try {
        const data =  dispatch(userLogin(login,password))
        if (data.error) {
      setServerError(data.error);
      return;
    }
        navigate('/')
      } catch (e) {
        setServerError(e.message)
      }
  }

  useResetForm(reset)
  const formError = errors?.login?.message || errors?.password?.message;
  const errorMessage = formError || serverError;

  return(
    <div className={className}>
      <div className="form">
        <div className="form-logo"> 
          <Logo />
          <p>Planner</p>
        </div>
        <div className="form-auth">
          <h2>Log In</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" $margin="0 0 10px 0" placeholder="Email" {...register('login', {
            onChange: ()=> setServerError(null),
          })}/>
        <Input type="text" $margin="0 0 10px 0" placeholder="Password" {...register('password', {
            onChange: ()=> setServerError(null),
          })} />
        <Button variant="contained" type='submit' >Log In</Button>
        <Link to='/register' style={{marginTop:'20px'}} >Register</Link>
      </Form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
      </div>
    </div>
  )
}

export const Authorization = styled(AuthorizationContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${({ $margin }) => $margin || 0};
  //margin-top: 100px;
  
  .form {
    width: 500px;
    height: 500px;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 0px 1px 4px 3px rgba(0, 0, 0, 0.1);
  }

  .form-auth{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form-logo{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    p {
      font-size: 30px;
      font-weight: 600;
    }
  }
  
`;