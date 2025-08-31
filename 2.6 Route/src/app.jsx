import { useState, useEffect } from "react";
import styles from './app.module.css'
import{ Routes, Route, Link, Outlet, useParams, useNavigate} from 'react-router-dom'


const MainList = () => {
  const [todos, setTodos] = useState([])
  const [refreshList, setRefreshList] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTask, setSearchTask] = useState('')
  const [isSorted, setIsSorted] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')


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

  //Поиск и сортировка
  const displayedTodos = todos
  .filter(todo => todo.title.toLowerCase().includes(searchTask.toLowerCase()) ||
                  todo.body.toLowerCase().includes(searchTask.toLowerCase()))
  .sort((a,b) => {
    if(!isSorted) return 0;
    return a.title.localeCompare(b.title)
  })

  return (
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
          <Link to={`/task/${data.id}`}className={styles['task-link']}>
          <div className={styles['list-item-content']}>
            <input type='checkbox' className={styles.checkbox} />
            {data.title + ': ' + data.body}
          </div>
          </Link>
          </li>
      ))}
      </ul>
    </div>
    </>
  )
}


const TaskDetail = ()=> {
  const [todos, setTodos] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [refreshList, setRefreshList] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {id} = useParams()

  useEffect(()=> {
    fetch(`http://localhost:3000/list/${id}`)
    .then((res)=> res.json())
    .then((data)=>{
      setTodos(data);
      setNewTitle(data.title);
      setNewBody(data.body)
    })
    .finally(()=> setIsLoading(false))
  }, [refreshList])

  //Удаляет задачу
  const requestRemoveTask = ()=> {
    fetch(`http://localhost:3000/list/${id}`, {
      method: 'DELETE',
    })
    .then((rawResponse)=> rawResponse.json())
    .then((response) => {
      console.log(`Task ${id} removed`,response)
      setRefreshList(!refreshList)
      navigate('/')
    })
    .catch((error)=>console.log('Ошибка',error))
  }

  //Изменяет задачу
  const requestChangeTask = () => {
    fetch(`http://localhost:3000/list/${id}`, {
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
      setRefreshList(!refreshList)
      navigate('/')
    })
    .catch((error)=>console.log('Ошибка',error))
  }
  
  return(
    <div>
    <div className={styles['task-change']}>
      <h2>Task ID: {id}</h2>
      
      <input 
        className={styles['task-title']}
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <textarea
        className={styles['task-body']}
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
      />
      <div className={styles['task-change-buttons']}>
        <button className={styles.button} onClick={requestChangeTask}>Сохранить изменения</button>
        <button className={styles.button} onClick={requestRemoveTask}>Удалить задачу</button>
        <button className={styles.button} onClick={() => navigate('/')}>Назад</button>
      </div>
    </div>
        </div> 
        
        
  )
}

const NotFound =()=>{
  return(
  <div>
    <h1>404 - Страница не найдена</h1>
    <Link to="/">На главную</Link>
  </div>
)}

export const App = () => {

  return(
    <>
    <div>
          <Routes>
            <Route path="/" element={<MainList />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
    </div>
    </>
  )
}