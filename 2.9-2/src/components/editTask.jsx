import { useDispatch, useSelector } from 'react-redux'
import styles from '../app.module.css'
import { selectIsModalOpen } from '../selectors/selectModal'
import { selectNewTitle } from '../selectors/selectNewTitle'
import { selectNewBody } from '../selectors/selectNewBody'
import { requestChangeTask } from '../service/taskService'


export const EditTask = () => {


  const dispatch = useDispatch()
  const isModalOpen = useSelector(selectIsModalOpen)
  const newTitle = useSelector(selectNewTitle)
  const newBody = useSelector(selectNewBody)
  const currentTask = useSelector(state=>state.form.currentTask)

  const handleSave = () => {
    if (!currentTask) return;
    dispatch(requestChangeTask(currentTask.id,newTitle,newBody))
  }

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
                  onChange={(e) => dispatch({type:'FORM/SET_TITLE', payload:e.target.value})}
                  placeholder="Title"
                />
                <textarea
                  value={newBody}
                  onChange={(e) => dispatch({type:'FORM/SET_BODY', payload:e.target.value})}
                  placeholder="Body"
                />
                <div className={styles.modalButtons}>
                  <button onClick={()=>handleSave(currentTask.id,newTitle,newBody)}>Save</button>
                  <button onClick={() => dispatch({type:'DISPLAY/TOGGLE_MODAL',payload:false})}>Cancel</button>
                </div>
              </div>
            </div>
            )}
            </div>
    </>
  )
}