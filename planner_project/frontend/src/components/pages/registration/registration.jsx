import styled from "styled-components"
import Button from '@mui/material/Button';
import { Logo } from "../../header/components/logo";
import { Input } from "../../input/input";
import * as yup from 'yup'
import {useDispatch} from 'react-redux'
import { useState } from "react";
import { useResetForm } from "../../../hooks";
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthFormError } from "../../../../../../blog/frontend1/src/components";
import { userRegister } from "../../../actions";

const regFormSchema = yup.object().shape({
  login: yup.string()
    .required('Insert email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Login is not correct')
    .email('Email is not correct'),
    

  password: yup.string()
    .required('Insert password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'Password is not correct')
    .min(6, 'Password is not correct. Min 6 symbols')
    .max(30, 'Password is not correct. Max 30 symbols'),

    passcheck: yup.string()
      .required('Repeat password')
      .oneOf([yup.ref('password'),null,'Password does not match'])
})

  const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

const RegistrationContainer = ({className}) => {

  const dispatch = useDispatch()
  const [serverError,setServerError] = useState(null)

    const {
      register,
      reset,
      handleSubmit,
      formState: {errors},
    } = useForm({
      defaultValues: {
        login: '',
        password: '',
        passcheck:''
      },
      resolver: yupResolver(regFormSchema)
    })
  

  const onSubmit = ({login,password}) =>{
    try {
      dispatch(userRegister(login,password))
    } catch (e) {
      setServerError(e.message)
    }
  }

      useResetForm(reset)
      const formError = errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
      const errorMessage = formError || serverError;


  return(
    <div className={className}>
          <div className="form">
            <div className="form-logo"> 
              <Logo />
              <p>Planner</p>
            </div>
            <div className="form-auth">
              <h2>Register</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input type="text" placeholder="Email" $margin="0 0 10px 0" {...register('login', {
            onChange: ()=> setServerError(null),
          })}/>
            <Input type="text" placeholder="Password" $margin="0 0 10px 0" {...register('password', {
            onChange: ()=> setServerError(null),
          })}/>
            <Input type="text" placeholder="Repeat Password" $margin="0 0 10px 0" {...register('passcheck', {
            onChange: ()=> setServerError(null),
          })} />
            <Button type="submit" variant="contained" >Register</Button>
          </Form>
          {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
            </div>
          </div>
        </div>
  )
}

export const Registration = styled(RegistrationContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  
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