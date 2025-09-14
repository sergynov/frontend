import styles from '../app.module.css'
import {store } from '../store'

export const InformationLayout = () => {
  
  const {isDraw, isGameEnded,currentPlayer,winnerPlayer} = store.getState()
  
  return (
    <>
    <div className={styles['current-turn']}>
      {isDraw ? 'Ничья' : isGameEnded ? `Победа: ${winnerPlayer}` : `Ходит: ${currentPlayer}`}
    </div>
    </>
  )
}

