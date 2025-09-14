import React from "react";
import { InformationLayout } from "./informationLayout";
import PropTypes from "prop-types";

export const Information = () => {
  return <InformationLayout />
}

Information.propTypes = {
  isDraw: PropTypes.bool,
  isGameEnded: PropTypes.bool,
  currentPlayer: PropTypes.string,
  winnerPlayer: PropTypes.func
}