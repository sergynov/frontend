import styles from '../app.module.css'
import { useContext } from 'react'
import { AppContext } from './context'

export const AddTaskForm = () => {
  
  const {newTitle, setNewTitle, newBody, setNewBody, requestAddTask} = useContext(AppContext)

  return(
    <div>
      <div className={styles.addTask}>
        <div>
          <input className={styles.newtask} type="text" placeholder="Название задачи" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} />
          <input className={styles.newtask} type="text" placeholder="Описание задачи" value={newBody} onChange={(e)=>setNewBody(e.target.value)} />
        </div>
          <button className={styles.addButton} onClick={requestAddTask}>Add Task</button>
          </div>
    </div>
  )
}