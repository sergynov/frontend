import styles from '../app.module.css'
import { useContext } from 'react'
import { AppContext } from './context'

export const EditTask = () => {

  const {isModalOpen, setIsModalOpen, newTitle,newBody,setNewBody,setNewTitle,requestChangeTask} = useContext(AppContext)

  return(
    <>
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