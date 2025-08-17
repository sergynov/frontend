import { useState, useEffect } from "react";
import styles from './app.module.css'
import { use } from "react";


export const App = () => {

  const [todos, setTodos] = useState([])
  const [refreshList, setRefreshList] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTask, setSearchTask] = useState('')
  const [isSorted, setIsSorted] = useState(false)


  useEffect(()=> {
    setIsLoading(true)
    fetch('http://localhost:3000/list')
    .then((res)=> res.json())
    .then((loadedTodos)=>{
      setTodos(loadedTodos)
      console.log(loadedTodos)
    })
    .finally(()=> setIsLoading(false))
  }, [refreshList])

  const requestAddTask = () => {
    fetch('http://localhost:3000/list', {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify({
        title: "Task 2",
        body: " yes-yes-yes"
      })
    })
    .then((rawResponse) => rawResponse.json())
    .then((response)=> {
      console.log('Task Added',response)
      setRefreshList(!refreshList)
    })
  }

  const requestRemoveTask = ()=> {
    fetch('http://localhost:3000/list/1', {
      method: 'DELETE',
    })
    .then((rawResponse)=> rawResponse.json())
    .then((response) => {
      console.log('task Removed',response)
      setRefreshList(!refreshList)
    })
  }

  const requestChangeTask = () => {
    fetch('http://localhost:3000/list/2', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify({
        title: "Task 2",
        body: "Task was changed"
      })
    })
    .then((rawResponse)=> rawResponse.json())
    .then((response) => {
      console.log('task was changed', response)
      setRefreshList(!refreshList)
    })
  }

  const displayedTodos = todos
  .filter(todo => todo.title.toLowerCase().includes(searchTask.toLowerCase()) ||
                  todo.body.toLowerCase().includes(searchTask.toLowerCase()))
  .sort((a,b) => {
    if(!isSorted) return 0;
    return a.title.localeCompare(b.title)
  })


  return(
    <>
    <div className={styles.wrapper}>
      <h1 className={styles.header}>To do List</h1>
      <div>
        <input type="text" placeholder='Поиск' onChange={(e)=> setSearchTask(e.target.value)} className={styles.search} />
        <button className={styles.button} onClick={()=>setIsSorted(prev => !prev)}>
          {isSorted ? 'Выключить сортировку' : 'Сортировать по алфавиту'}</button>
      </div>
      <ul className={styles.list}>
      {isLoading ? <div className={styles.loader}></div> : displayedTodos
      .map((data)=> (
        <li key={data.id} className={styles['list-item']}>
          {data.title + ': ' + data.body}
          <input type='checkbox' className={styles.checkbox} /></li>
      ))}
      </ul>
    </div>
    <div className={styles.buttons}>
      <button className={styles.button} onClick={requestAddTask}>Add Task</button>
      <button className={styles.button} onClick={requestRemoveTask}>Remove Task 1</button>
      <button className={styles.button} onClick={requestChangeTask}>Change Task 2</button>
    </div>
    </>
  )
}