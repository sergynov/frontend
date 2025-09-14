import styles from '../app.module.css'
import { store } from "../store";

export const FieldLayout = ({onCellClick, handleStart}) => {

  const {gameField} = store.getState()

  return (
    <>
    <div className={styles['game-field']}>
      {gameField.map((row, rowIndex) => (
        <div key={rowIndex} className={styles['cell-grid']}>
          {row.map((item, itemIndex) => (
            <button key={itemIndex} className={styles['cell']} onClick={()=> onCellClick(rowIndex,itemIndex)}>{item}</button>
          ))}
        </div>
      ))}
      <div className={styles['start-over']}>
        <button className={styles['start-over-button']} onClick={()=>handleStart()}>Начать заново</button>
      </div>
    </div>
    </>
  )
}
