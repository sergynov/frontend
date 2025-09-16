import { useSelector } from 'react-redux'
import styles from '../app.module.css'
import {store } from '../store'
import {selectCurrentPlayer, selectIsDraw, selectIsGameEnded, selectWinnerPlayer} from '../selectors'

export const InformationLayout = () => {
  


  const isDraw = useSelector(selectIsDraw)
  const isGameEnded = useSelector(selectIsGameEnded)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const winnerPlayer = useSelector(selectWinnerPlayer)
  
  return (
    <>
    <div className={styles['current-turn']}>
      {isDraw ? 'Ничья' : isGameEnded ? `Победа: ${winnerPlayer}` : `Ходит: ${currentPlayer}`}
    </div>
    </>
  )
}

