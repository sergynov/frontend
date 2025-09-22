import { useDispatch, useSelector } from 'react-redux'
import styles from '../app.module.css'
import { selectIsLoading } from '../selectors/selectIsLoading'
import { selectDisplayedTodos } from '../selectors/selectDisplayedTodos'
import { requestRemoveTask } from '../service/taskService'

export const TaskList = ()=> {

  const isLoading = useSelector(selectIsLoading)
  const dispatch = useDispatch()
  const handleRemoveTask = (id)=> {
    dispatch(requestRemoveTask(id))
  }
  const handleOpenModal = (task) => {
    dispatch({ type: 'FORM/SET_TASK', payload: task })
    dispatch({ type: 'DISPLAY/TOGGLE_MODAL', payload: true })
  }
  const displayedTodos = useSelector(selectDisplayedTodos)

  return (
    <>
    <ul className={styles.list}>
          {isLoading ? <div className={styles.loader}></div> : displayedTodos
          .map((data)=> (
            <li key={data.id} className={styles['list-item']}>
              <div className={styles['list-item-content']}>
                <input type='checkbox' className={styles.checkbox} />
                {data.title + ': ' + data.body}
              </div>
              <div>
                <button className={styles.button} onClick={()=>handleRemoveTask(data.id)}>Remove Task</button>
                <button className={styles.button} onClick={()=>handleOpenModal(data)}>Change Task</button>
              </div>
              </li>
          ))}
          </ul>
    </>
    
  )
}