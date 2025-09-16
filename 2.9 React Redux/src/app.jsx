import { useState, useEffect} from "react";
import { Information } from "./components/information";
import { GameLayout } from "./gameLayout";
import { makeMove } from "./reducer";
import { selectGameField } from './selectors'
import { useSelector, useDispatch } from "react-redux";

export const App = () => {

  const gameField = useSelector(selectGameField)
  const dispatch = useDispatch()
  
  const handleMove = (rowIndex, cellIndex) => {
    dispatch(makeMove(rowIndex, cellIndex));
  }

  const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Варианты побед по горизонтали
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Варианты побед по вертикали
  [0, 4, 8], [2, 4, 6] // Варианты побед по диагонали
];

  const winner = (gameField)=> {
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

  useEffect(() => {
    const result = winner(gameField);

    if (result === 'X' || result === '0') {
      dispatch({type:'SET_WINNER_PLAYER',payload:result})
    } else if (result === 'draw') {
      dispatch({type:'SET_DRAW'})
    }
  }, [gameField]);

  const handleStart = ()=> {
    dispatch({type:'RESTART_GAME'})
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