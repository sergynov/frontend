import FieldLayout from './fieldLayout'
import { Component } from 'react'


export class Field extends Component {
  render() {
    const {onCellClick, handleStart} = this.props

    return(
      <FieldLayout onCellClick={onCellClick} handleStart={handleStart} />
    )
  }
}