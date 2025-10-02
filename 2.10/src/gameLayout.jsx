import { Component } from "react"
import { Field } from "./components/field"


export class GameLayout extends Component {
  render() {

    const {onCellClick,handleStart} = this.props;
    return(
      <Field  onCellClick={onCellClick} handleStart={handleStart}  />
    )
  }
 }