import styles from '../app.module.css'
import { useDispatch, useSelector } from 'react-redux'
import {selectSearchTask} from '../selectors/selectSearchTask'
import { selectIsSorted } from '../selectors/selectIsSorted'

export const Header = () => {

  const isSorted = useSelector(selectIsSorted)
  const searchTask = useSelector(selectSearchTask)
  const dispatch = useDispatch()

  return(
    <div>
      <input type="text" placeholder='Поиск' value={searchTask} onChange={(e)=> dispatch({type:'DISPLAY/SET_SEARCH',payload:e.target.value})} className={styles.search} />
      <button className={styles.button} onClick={()=>dispatch({type:'DISPLAY/TOGGLE_SORT'})}>
        {isSorted ? 'Выключить сортировку' : 'Сортировать по алфавиту'}</button>
    </div>
  )
}