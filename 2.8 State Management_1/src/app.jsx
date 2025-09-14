import { useState, useEffect} from "react";
import styles from './app.module.css'
import {Field} from './components/field'
import { Information } from "./components/information";
import { GameLayout } from "./gameLayout";
import { store } from "./store";
import { makeMove } from "./reducer";

export const App = () => {

  const [state,setState] = useState(store.getState())

  useEffect(()=>{
    const unsubscribe = store.subscribe(()=>{
      setState(store.getState())
    });
    return unsubscribe
  }, [])

  const {gameField,isGameEnded,currentPlayer,isDraw,winnerPlayer} = store.getState();
  
  const handleMove = (rowIndex, cellIndex) => {
    store.dispatch(makeMove(rowIndex, cellIndex));
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
      store.dispatch({type:'SET_WINNER_PLAYER',payload:result})
      store.dispatch({type:'END_GAME'})
    } else if (result === 'draw') {
      store.dispatch({type:'SET_DRAW'})
      store.dispatch({type:'END_GAME'})
      
    }
  }, [gameField]);

  const handleStart = ()=> {
    store.dispatch({type:'RESTART_GAME'})
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