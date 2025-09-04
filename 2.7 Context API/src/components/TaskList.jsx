import styles from '../app.module.css'
import { useContext } from 'react'
import { AppContext } from './context'

export const TaskList = ()=> {

  const {requestRemoveTask,openModal,displayedTodos,isLoading,setIsLoading} = useContext(AppContext)

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
                <button className={styles.button} onClick={()=>requestRemoveTask(data.id)}>Remove Task</button>
                <button className={styles.button} onClick={()=>openModal(data)}>Change Task</button>
              </div>
              </li>
          ))}
          </ul>
    </>
    
  )
}