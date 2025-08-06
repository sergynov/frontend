//with YUP and React Hook Form

import { useState, useEffect, use } from "react";
import styles from './app.module.css'
import { Form } from "./components/form";
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'

  const schema = yup.object({
    email: yup
      .string()
      .email('Введите корректный email')
      .required('Email обязателен'),
    password: yup
      .string()
      .trim()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,'Пароль должен содержать минимум 8 символов, включая заглавную, строчную букву и цифру')
      .required('Пароль обязателен'),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'),null], 'Пароли не совпадают')
      .required('Повтор пароля обязателен'),
  })

export const App = () => {

  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm ({
    resolver: yupResolver(schema),
    mode: 'onblur',
  });

  const onSubmit = (data) => {
    console.log(data)
  }

  return(

    <>
    <Form onSubmit={handleSubmit(onSubmit)} isFormValid={isValid}  register={register} errors={errors} />
    </>
  )
}