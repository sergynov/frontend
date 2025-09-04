import styles from '../app.module.css'
import { AppContext } from './context'
import { useContext } from 'react'

export const Header = () => {

const {isSorted, setIsSorted, searchTask, setSearchTask} = useContext(AppContext)

  return(
    <div>
      <input type="text" placeholder='Поиск' onChange={(e)=> setSearchTask(e.target.value)} className={styles.search} />
      <button className={styles.button} onClick={()=>setIsSorted(prev => !prev)}>
        {isSorted ? 'Выключить сортировку' : 'Сортировать по алфавиту'}</button>
    </div>
  )
}