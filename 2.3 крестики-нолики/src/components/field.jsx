import React from "react";
import {FieldLayout} from './fieldLayout'
import PropTypes from "prop-types";

export const Field = ({gameField,currentPlayer, onCellClick,isDraw,isGameEnded, handleStart, winnerPlayer}) => {

  return <FieldLayout gameField={gameField} onCellClick={onCellClick} isDraw={isDraw}
    isGameEnded={isGameEnded} currentPlayer={currentPlayer}handleStart={handleStart} winnerPlayer={winnerPlayer} />
}
Field.propTypes = {
  gameField: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  currentPlayer: PropTypes.string,
  onCellClick: PropTypes.func,
  isGameEnded: PropTypes.bool,
  isDraw: PropTypes.bool,
  handleStart: PropTypes.func,
  winnerPlayer: PropTypes.func
}