import { useState, useEffect } from "react";
import styles from './app.module.css'
import { db } from "./firebase";
import { ref, onValue, push,set,remove } from "firebase/database";


export const App = () => {

  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTask, setSearchTask] = useState('')
  const [isSorted, setIsSorted] = useState(false)


  useEffect(()=> {
    setIsLoading(true)

    const listDbRef = ref(db, 'ToDoList')

    onValue(listDbRef, (snapshot)=>{
      const data = snapshot.val() || [];

      const loadedTasks = Object.entries(data).map(([key,value]) =>({
        id:key,
        ...value
      }));
      console.log(loadedTasks)
      setTodos(loadedTasks);
      setIsLoading(false)
    })
  }, [])

  //Добавляет задачу
  const requestAddTask = () => {
    const listDbRef = ref(db,'ToDoList');

    push(listDbRef, {
      title: 'New Task',
      body: 'this task was just added'
    })
    .then((response)=>{
      console.log('Task added', response)
    })
  }

  //Удаляет задачу
  const requestRemoveTask = ()=> {
    const task1DbRef = ref(db,'ToDoList/001')

    remove(task1DbRef)
    .then((response)=>{
      console.log('Task 1 was removed', response)
    })
  }

  //Изменяет задачу
  const requestChangeTask = () => {
    const task3DbRef = ref(db, 'ToDoList/004')
    set(task3DbRef, {
      title: 'Task 3',
      body: 'This task was changed',
    })
    .then((response)=>{
      console.log('Task 3 was changed')
    })
  }

  //Поиск и сортировка
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
      <h1 className={styles.header}>To Do List</h1>
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
      <button className={styles.button} onClick={requestChangeTask}>Change Task 3</button>
    </div>
    </>
  )
}