import { useState } from 'react'
import React from 'react'
import styles from './App.module.css'


function App() {

  const [value, setValue] = useState('')
  const [list, setList] = useState([])
  const [error, setError] = useState('')

  const onInputButtonClick = () => {
    const promptValue = prompt('input')
    console.log(promptValue)

    if(promptValue.length < 3){
      setError()
      setValue('')
    } else {
      setValue(promptValue)
      setError('')
    }
  }
  
  const isValueValid = value.length >= 3;

  const onAddButtonClick = () => {
    const id = Date.now()
    if(isValueValid) {
      const updatedList = [...list, {id,value,updatedDate}]
      setList(updatedList)
      setValue('')
      setError('')
      console.log(list)
    }
  }

  const date = new Date()
  const formattedDate = date.toLocaleDateString('ru-RU')
  const formattedTime = date.toLocaleTimeString('ru-RU')
  const updatedDate = `${formattedDate} ${formattedTime}`

  return (
    <div className={styles.app}>
    <h1 className={styles['page-heading']}>Ввод значения</h1>
    <p className={styles['no-margin-text']}>
      Текущее значение <code>value</code>: "<output className={styles['current-value']}>{value}</output>"
    </p>

    {error !== '' && (<div className={styles.error} > {error} Введенное значение должно содержать минимум 3 символа</div>)}
    
    <div className={styles['buttons-container']}>
      <button className={styles.button} onClick={onInputButtonClick} >Ввести новое</button>
      <button className={styles.button} disabled={!isValueValid} onClick={onAddButtonClick}>Добавить в список</button>
    </div>

    <div className={styles['list-container']}>
      <h2 className={styles['list-heading']}>Список:</h2>
      
      {list.length > 0 ? (
        <ul className={styles.list}>{list.map((item) => 
          <li key={item.id} className={styles['list-item']}>{item.value}, {item.updatedDate}</li> )}
        </ul>) : 
        (<p className={styles['no-margin-text']}>Нет добавленных элементов</p>)}
    </div>
  </div>
  )
}
export default App;
