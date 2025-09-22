import { useSelector } from 'react-redux'
import styles from '../app.module.css'
import { selectNewBody } from '../selectors/selectNewBody'
import { selectNewTitle } from '../selectors/selectNewTitle'
import { useDispatch } from 'react-redux'
import { requestAddTask } from '../service/taskService'

export const AddTaskForm = () => {
  
  const dispatch = useDispatch()
  const newTitle = useSelector(selectNewTitle)
  const newBody = useSelector(selectNewBody)
  const handleAddTask = ()=> {
    dispatch(requestAddTask(newTitle,newBody))
  }

  return(
    <div>
      <div className={styles.addTask}>
        <div>
          <input className={styles.newtask} type="text" placeholder="Название задачи" value={newTitle} onChange={(e)=>dispatch({type:'FORM/SET_TITLE',payload: e.target.value})} />
          <input className={styles.newtask} type="text" placeholder="Описание задачи" value={newBody} onChange={(e)=>dispatch({type:'FORM/SET_BODY', payload:e.target.value})} />
        </div>
          <button className={styles.addButton} onClick={handleAddTask}>Add Task</button>
          </div>
    </div>
  )
}