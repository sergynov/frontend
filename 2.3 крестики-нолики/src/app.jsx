import { useState, useEffect, use } from "react";
import styles from './app.module.css'
import {Field} from './components/field'
import { Information } from "./components/information";
import { GameLayout } from "./gameLayout";


export const App = () => {

  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [isGameEnded, setIsGameEnded] = useState(false)
  const [isDraw, setIsDraw] = useState(false)
  const emptyField = () => [
    [' ',' ',' ',],
    [' ',' ',' ',],
    [' ',' ',' ',],
  ]

  const [gameField, setGameField] = useState(emptyField)
  const [winnerPlayer, setWinnerPlayer] = useState(null)
  
  const handleMove = (rowIndex, cellIndex) => {
    if(isGameEnded || gameField[rowIndex][cellIndex] !== ' ') return;

    const updatedField = gameField.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === cellIndex ? currentPlayer : cell
      )
    );

    setGameField(updatedField);
    setCurrentPlayer(currentPlayer === 'X' ? '0' : 'X');
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
      setIsGameEnded(true);
      setWinnerPlayer(result)
    } else if (result === 'draw') {
      setIsGameEnded(true);
      setIsDraw(true);
    }
  }, [gameField]);

  const handleStart = ()=> {
    setGameField(emptyField)
    setIsGameEnded(false)
    setIsDraw(false)
  }
  return(
    <>
    
    <div>
    <h1>Крестики-нолики</h1>
    </div>

    
    <Information isDraw={isDraw} isGameEnded={isGameEnded} currentPlayer={currentPlayer} winnerPlayer={winnerPlayer}/>
    <GameLayout gameField={gameField} currentPlayer={currentPlayer} onCellClick={handleMove} 
      isDraw={isDraw} isGameEnded={isGameEnded} winner={winner} handleStart={handleStart} />
    </>
  )
	
}