import { useState, useEffect } from "react";
import styles from './app.module.css'
import { Header } from "./components/header";
import { AddTaskForm } from "./components/AddTaskFrom";
import { EditTask } from "./components/editTask";
import { TaskList } from "./components/TaskList";
import { loadTodos} from './service/taskService'
import { useDispatch, useSelector } from "react-redux";
import { selectDisplayedTodos } from "./selectors/selectDisplayedTodos";




export const App = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(loadTodos())
  },[dispatch])

  const todo = useSelector(selectDisplayedTodos)


  return(
    <>
    <div className={styles.wrapper}>
      <h1 className={styles.header}>To Do List</h1>
      <Header />
      <AddTaskForm />
      <TaskList />
      <EditTask />
    </div>
    </>
  )
}