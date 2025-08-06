import React from "react";
import styles from '../app.module.css'

export const Form = ({onSubmit, onEmailChange, emailError,email,passwordValidation, passwordError, password,onRepeatPasswordChange,repeatPassword,isFormValid,onEmailBlur}) => {

  return (
    <>
    <div className={styles['form-container']}>
      <form onSubmit={onSubmit}>
        <input className={styles.input} type="text" value={email} name="email" placeholder="Email" onChange={onEmailChange} onBlur={onEmailBlur}/>
        <input className={styles.input} type="text" value={password} name="password" placeholder="Password" onChange={passwordValidation}/>
        <input className={styles.input} type="text" value={repeatPassword} name="repeatPassword" placeholder="Repeat Password" onChange={onRepeatPasswordChange}/>
        <button type="submit" className={styles['send-button']} disabled={!isFormValid}>Зарегистрироваться</button>
        {emailError && <div className={styles.errorLabel}>{emailError}</div>}
        {passwordError && <div className={styles.errorLabel}>{passwordError}</div>}
      </form>
    </div>
    </>
  )
}