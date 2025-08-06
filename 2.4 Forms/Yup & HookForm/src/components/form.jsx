import React from "react";
import styles from '../app.module.css'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

export const Form = ({onSubmit,  errors,  isFormValid, register}) => {

  return (
    <>
    <div className={styles['form-container']}>
      <form onSubmit={onSubmit}>
        <input type="text" name='email' placeholder="Email" {...register('email')}/>
        <input type="text" name="password" placeholder="Password" {...register('password')} />
        <input type="text" name="repeatPassword" placeholder="Repeat Password" {...register('repeatPassword')} />
        <button type="submit" className={styles['send-button']} disabled={!isFormValid}>Зарегистрироваться</button>
        {errors.email && <div className={styles.errorLabel}>{errors.email.message}</div>}
        {errors.password && <div className={styles.errorLabel}>{errors.password.message}</div>}
        {errors.repeatPassword && <div className={styles.errorLabel}>{errors.repeatPassword.message}</div>}
      </form>
    </div>
    </>
  )
}