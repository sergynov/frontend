import {Component} from "react";
import { Information } from "./components/information";
import { GameLayout}  from "./gameLayout";
import { selectGameField } from './selectors'
import { connect } from "react-redux";
import { WIN_PATTERNS } from "./components/winPatterns";
import { makeMoveAction,
    setDrawAction,
    setWinnerPlayerAction,
    restartGameAction } from "./actions/actions";

class App extends Component {

  constructor(props){
    super(props)
  }
    
  winner (gameField) {
    const flatField = gameField.flat()

    for (let pattern of WIN_PATTERNS) {
      const [a,b,c] = pattern
      if( flatField[a] !== ' '&&flatField[a]===flatField[b]&&flatField[b]===flatField[c]) {
        return flatField[a]
      }
    }
    const isDraw = flatField.every((cell) => cell !== ' ');
    if (isDraw) return 'draw';
    return null
  }
  
  componentDidUpdate(prevProps){
    
  if (prevProps.gameField !== this.props.gameField) {
    const result = this.winner(this.props.gameField);

    if (result === "X" || result === "0") {
      this.props.setWinnerPlayer(result);
    } else if (result === "draw") {
      this.props.setDraw();
    }
  }
}

  render() {

    const {makeMove, handleStart, gameField} = this.props
    const handleMove = (rowIndex, cellIndex) => {
      makeMove(rowIndex, cellIndex);
  }
  
  return(
    <>
    
    <div>
    <h1>Крестики-нолики</h1>
    </div>

    
    <Information />
    <GameLayout  onCellClick={handleMove}  handleStart={handleStart} />
    </>
  )
}
}

const mapStateToProps = (state) =>({
  gameField: selectGameField(state)
})

const mapDispatchToProps = {
  makeMove: makeMoveAction,
  setWinnerPlayer: setWinnerPlayerAction,
  setDraw: setDrawAction,
  handleStart: restartGameAction,
}

export default connect(mapStateToProps,mapDispatchToProps)(App)