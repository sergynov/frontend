import { useState, useEffect } from "react";
import styles from './app.module.css'



export const App = () => {

  const [todos, setTodos] = useState([])
  const [refreshList, setRefreshList] = useState(false)
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
    fetch('http://localhost:3000/list')
    .then((res)=> res.json())
    .then((loadedTodos)=>{
      setTodos(loadedTodos)
      console.log(loadedTodos)
    })
    .finally(()=> setIsLoading(false))
  }, [refreshList])

  //Добавляет задачу
  const requestAddTask = () => {
    fetch('http://localhost:3000/list', {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify({
        title: newTitle,
        body: newBody
      })
    })
    .then((rawResponse) => rawResponse.json())
    .then((response)=> {
      console.log('Task Added',response)
      setNewTitle('')
      setNewBody('')
      setRefreshList(!refreshList)
    })
    .catch((error)=>console.log('Ошибка',error))
  }

  //Удаляет задачу
  const requestRemoveTask = (id)=> {
    fetch(`http://localhost:3000/list/${id}`, {
      method: 'DELETE',
    })
    .then((rawResponse)=> rawResponse.json())
    .then((response) => {
      console.log(`Task ${id} removed`,response)
      setRefreshList(!refreshList)
    })
    .catch((error)=>console.log('Ошибка',error))
  }

  //Изменяет задачу
  const requestChangeTask = () => {
    if(!currentTask) return;

    fetch(`http://localhost:3000/list/${currentTask.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body: JSON.stringify({
        title: newTitle,
        body: newBody
      })
    })
    .then((rawResponse)=> rawResponse.json())
    .then((response) => {
      console.log('task was changed', response)
      setCurrentTask(null)
      setIsModalOpen(false)
      setRefreshList(!refreshList)
    })
    .catch((error)=>console.log('Ошибка',error))
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
      <div>
        <div className={styles.addTask}>
          <div>
            <input className={styles.newtask} type="text" placeholder="Название задачи" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} />
            <input className={styles.newtask} type="text" placeholder="Описание задачи" value={newBody} onChange={(e)=>setNewBody(e.target.value)} />
          </div>
            <button className={styles.addButton} onClick={requestAddTask}>Add Task</button>
        </div>
      </div>
      <ul className={styles.list}>
      {isLoading ? <div className={styles.loader}></div> : displayedTodos
      .map((data)=> (
        <li key={data.id} className={styles['list-item']}>
          <div className={styles['list-item-content']}>
            <input type='checkbox' className={styles.checkbox} />
            {data.title + ': ' + data.body}
          </div>
          <div>
            <button className={styles.button} onClick={()=>requestRemoveTask(data.id)}>Remove Task</button>
            <button className={styles.button} onClick={()=>openModal(data)}>Change Task</button>
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