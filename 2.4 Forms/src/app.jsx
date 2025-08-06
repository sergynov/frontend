import { useState, useEffect, use } from "react";
import styles from './app.module.css'
import { Form } from "./components/form";

const sendFormData = (formData)=> {
  console.log(formData)
}

export const App = () => {

  const  [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [repeatPassword, setRepeatPassword] = useState('')

  const onEmailChange = ({target})=> {
    setEmail(target.value)

    let newError = null;

    if(target.value.length<1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target.value)){
      newError = 'ERROR. Введите корректный email';
    } setEmailError(newError)
  }

  const passwordValidation = ({target}) => {
    setPassword(target.value)
    let newError = null;
    if(target.value.length<1 && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(target.value)) {
      newError = 'ERROR. Пароль должен содержать минимум 8 символов, включая заглавную букву, строчную букву и цифру'
    } setPasswordError(newError)
  }

  const onRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value)
    let newError = null;
    if(event.target.value !== password) {
      newError = 'Пароли не совпадают!'
    }setPasswordError(newError)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    sendFormData({email,password})
  }

  const onEmailBlur = ({target}) => {
    let error = null;
    if(!target.value.includes('@')){
      error = 'email не верный'
    }
    setEmailError(error)
  }
  
  const isFormValid = email && password && repeatPassword && !emailError && !passwordError && password === repeatPassword;

  return(

    <>

    <Form onSubmit={onSubmit} onEmailChange={onEmailChange} emailError={emailError} email={email}
      passwordValidation={passwordValidation} passwordError={passwordError} password={password}
      repeatPassword={repeatPassword} onRepeatPasswordChange={onRepeatPasswordChange} isFormValid={isFormValid} onEmailBlur={onEmailBlur}/>
    </>
  )
}