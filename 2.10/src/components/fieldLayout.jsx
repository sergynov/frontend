import styles from '../app.module.css'
import { connect } from 'react-redux';
import{selectGameField} from '../selectors'
import { Component } from 'react';

class FieldLayout extends Component {
  render() {

    const {gameField,onCellClick, handleStart} = this.props;

    return (
      <>
    <div className={styles['game-field']}>
      {gameField.map((row, rowIndex) => (
        <div key={rowIndex} className={styles['cell-grid']}>
          {row.map((item, itemIndex) => (
            <button key={itemIndex} className={styles['cell']} onClick={()=>onCellClick(rowIndex,itemIndex)}>{item}</button>
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
}

const mapStateToProps = (state) => ({
  gameField: selectGameField(state)
})

export default connect(mapStateToProps)(FieldLayout)