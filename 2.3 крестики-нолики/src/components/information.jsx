import React from "react";
import { InformationLayout } from "./informationLayout";
import PropTypes from "prop-types";

export const Information = ({isDraw, isGameEnded, currentPlayer, winnerPlayer}) => {
  return <InformationLayout isDraw={isDraw} isGameEnded={isGameEnded} currentPlayer={currentPlayer} winnerPlayer={winnerPlayer}/>
}

Information.propTypes = {
  isDraw: PropTypes.bool,
  isGameEnded: PropTypes.bool,
  currentPlayer: PropTypes.string,
  winnerPlayer: PropTypes.func
}