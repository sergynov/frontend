import { useState, useEffect } from "react";
import styles from './app.module.css'
import { db } from "./firebase";
import { ref, onValue, push,set,remove,update } from "firebase/database";


export const App = () => {

  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTask, setSearchTask] = useState('')
  const [isSorted, setIsSorted] = useState(false)

  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)

  const openModal= (task) =>{
    setCurrentTask(task);
    setNewTitle(task.title);
    setNewBody(task.body);
    setIsModalOpen(true)
  }


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
      title: newTitle,
      body: newBody
    })
    .then((response)=>{
      console.log('Task added', response)
    })

    setNewTitle('')
    setNewBody('')
  }

  //Удаляет задачу
  const requestRemoveTask = (id)=> {
    const taskDbRef = ref(db,`ToDoList/${id}`)

    remove(taskDbRef)
    .then((response)=>{
      console.log('Task was removed', response)
    })
    .catch((error)=> {
      console.log('Произошла ошибка ', error)
    })
  }

  //Изменяет задачу
  const requestChangeTask = () => {
    if(!currentTask) return;

    const taskDbRef = ref(db, `ToDoList/${currentTask.id}`)
    update(taskDbRef, {
      title: newTitle,
      body: newBody,
    })
    .then(()=>{
      console.log('Task was changed')
      setIsModalOpen(false)
      setCurrentTask(null)
    })
  }

  //Поиск и сортировка
  const displayedTodos = todos
  .filter(todo => (todo.title || '').toLowerCase().includes(searchTask.toLowerCase()) ||
                  (todo.body|| '').toLowerCase().includes(searchTask.toLowerCase()))
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
      <div className={styles.addTask}>
        <div className={styles.inputs}>
        <input className={styles.newtask} type="text" placeholder="Название задачи" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} />
        <input className={styles.newtask} type="text" placeholder="Описание задачи" value={newBody} onChange={(e)=>setNewBody(e.target.value)} />
      </div>
      <button className={styles.addButton} onClick={requestAddTask}>Add Task</button>
        
      </div>
      <ul className={styles.list}>
      {isLoading ? <div className={styles.loader}></div> : displayedTodos
      .map((data)=> (
        <li key={data.id} className={styles['list-item']}>
          <div className={styles['list-item-content']}>
          <input type='checkbox' className={styles.checkbox} />
          {data.title + ': ' + data.body}
          </div>
          <div className={styles.buttons}>
          <button className={styles.button} onClick={()=>requestRemoveTask(data.id)}>Remove</button>
          <button className={styles.button} onClick={()=>openModal(data)}>Change</button>
          </div>
          
          </li>
      ))}
      </ul>
    </div>
    {/*Модальное окно для изменения задачи */}
    <div>
      {isModalOpen && (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Edit Task</h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          placeholder="Body"
        />
        <div className={styles.modalButtons}>
          <button onClick={requestChangeTask}>Save</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
    )}
    </div>
    </>
  )
}