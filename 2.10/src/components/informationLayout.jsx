import styles from '../app.module.css'
import {selectCurrentPlayer, selectIsDraw, selectIsGameEnded, selectWinnerPlayer} from '../selectors'
import { Component } from 'react'
import { connect } from 'react-redux'


class InformationLayout extends Component {
  render() {
    const {isDraw,isGameEnded,currentPlayer,winnerPlayer} = this.props

    return(
      <div className={styles['current-turn']}>
      {isDraw ? 'Ничья' : isGameEnded ? `Победа: ${winnerPlayer}` : `Ходит: ${currentPlayer}`}
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isDraw: selectIsDraw(state),
  isGameEnded: selectIsGameEnded(state),
  currentPlayer: selectCurrentPlayer(state),
  winnerPlayer: selectWinnerPlayer(state),
})

export default connect(mapStateToProps)(InformationLayout)