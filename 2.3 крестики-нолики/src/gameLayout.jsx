import React from "react"
import styles from './app.module.css'
import { useState } from "react"
import { FieldLayout } from "./components/fieldLayout"
import PropTypes from "prop-types"
import { Field } from "./components/field"

export const GameLayout = ({gameField,currentPlayer, onCellClick,isDraw,isGameEnded, handleStart, winnerPlayer}) => {


  return(
    <Field gameField={gameField} onCellClick={onCellClick} isDraw={isDraw}
    isGameEnded={isGameEnded} currentPlayer={currentPlayer}handleStart={handleStart} winnerPlayer={winnerPlayer} />
  )
}

GameLayout.propTypes = {
  gameField: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  currentPlayer: PropTypes.string,
  onCellClick: PropTypes.func,
  isGameEnded: PropTypes.bool,
  isDraw: PropTypes.bool,
  handleStart: PropTypes.func,
  winnerPlayer: PropTypes.func
}