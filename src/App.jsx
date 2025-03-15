import './styles.scss';
import { useState } from 'react';
import { calculateWinner } from './winner';
import Board from './components/Board';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  const winner = calculateWinner(squares);
  const nextPlayer = isXNext ? 'X' : 'O';
  const statusMessage = winner
    ? `Winner is ${winner}`
    : `Next Player: ${nextPlayer}`;

  const handleSquareClick = clickedPosition => {
    if (squares[clickedPosition] || winner) {
      return;
    }

    setSquares(currentSquares => {
      return currentSquares.map((squareValue, position) => {
        if (clickedPosition === position) {
          return isXNext ? 'X' : 'O';
        }
        return squareValue;
      });
    });

    setIsXNext(currentIsXNext => !currentIsXNext);
  };
  return (
    <div className="app">
      <h2>{statusMessage}</h2>
      <Board squares={squares} handleSquareClick={handleSquareClick} />
    </div>
  );
}

export default App;
