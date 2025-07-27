import React from "react";
import styles from '../app.module.css'
import PropTypes from "prop-types";

export const InformationLayout = ({isDraw, isGameEnded, currentPlayer, winnerPlayer}) => {
  return (
    <>
    <div className={styles['current-turn']}>
      {isDraw ? 'Ничья' : isGameEnded ? `Победа: ${winnerPlayer}` : `Ходит: ${currentPlayer}`}
    </div>
    </>
  )
}

InformationLayout.propTypes = {
  isDraw: PropTypes.bool,
  isGameEnded: PropTypes.bool,
  currentPlayer: PropTypes.string,
  winnerPlayer: PropTypes.func
}