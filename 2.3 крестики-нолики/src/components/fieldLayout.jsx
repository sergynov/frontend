import React from "react";
import styles from '../app.module.css'
import PropTypes from 'prop-types'

export const FieldLayout = ({gameField, onCellClick, handleStart}) => {

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
FieldLayout.propTypes = {
  gameField: PropTypes.bool,
  onCellClick: PropTypes.func,
  handleStart: PropTypes.func
}