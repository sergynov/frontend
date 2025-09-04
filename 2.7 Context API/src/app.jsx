import { useState, useEffect } from "react";
import styles from './app.module.css'
import { AppContext } from "./components/context";
import { Header } from "./components/header";
import { AddTaskForm } from "./components/AddTaskFrom";
import { EditTask } from "./components/editTask";
import { TaskList } from "./components/TaskList";




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


  return(
    <>
    <div className={styles.wrapper}>
      <h1 className={styles.header}>To Do List</h1>
      <AppContext value={{isSorted, setIsSorted, searchTask, setSearchTask, newBody,setNewBody,newTitle,setNewTitle,requestAddTask,
        requestChangeTask, requestRemoveTask, openModal, displayedTodos, isLoading, setIsLoading,isModalOpen,setIsModalOpen
      }}>
      <Header />
      <AddTaskForm />
      <TaskList />
      <EditTask />
      </AppContext>
    </div>
    </>
  )
}