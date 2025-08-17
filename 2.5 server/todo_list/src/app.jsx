import { useState, useEffect } from "react";
import styles from './app.module.css'
import { use } from "react";


export const App = () => {

  const [todos, setTodos] = useState([])


  useEffect(()=> {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    .then((res)=> res.json())
    .then((loadedTodos)=>{
      setTodos(loadedTodos)
      console.log(loadedTodos)
    })
  }, [])


  return(
    <>
    
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Todo List</h1>
      <ul className={styles.list}>
      {todos.map((data)=> (
        <li key={data.id} className={styles['list-item']}>
          {data.title} <input type='checkbox' className={styles.checkbox} /></li>
      ))}
      </ul>
    </div>
    </>
  )
}