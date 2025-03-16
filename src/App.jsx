import './styles.scss';
import { useState } from 'react';
import { calculateWinner } from './winner';
import { getBotMove } from './nextBotMove';
import Board from './components/Board';
import StatusMessage from './components/StatusMessage';
// import History from './components/History';
import Reset from './components/Reset';
import RadioButton from './components/RadioButton';

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: true }];

function App() {
  const [selectedOption, setSelectedOption] = useState('PVP');

  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setcurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);

  const handleSquareClick = clickedPosition => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }

    setHistory(currentHistory => {
      const isTraversing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];

      const nextSquareState = lastGamingState.squares.map(
        (squareValue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? 'X' : 'O';
          }
          return squareValue;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      if (selectedOption == 'PVB') {
        const nextMoveLocation = getBotMove(nextSquareState);
        nextSquareState[nextMoveLocation] = 'O';
        return base.concat({
          squares: nextSquareState,
          isXNext: true,
        });
      }

      return base.concat({
        squares: nextSquareState,
        isXNext: !lastGamingState.isXNext,
      });
    });

    setcurrentMove(move => move + 1);
  };

  //   const moveTo = move => {
  //     setcurrentMove(move);
  //   };

  const resetGame = () => {
    setHistory(NEW_GAME);
    setcurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC</span> TOE
      </h1>
      <RadioButton
        name={'Select Mode'}
        options={[
          { label: '2 Player', value: 'PVP' },
          { label: 'Player vs BOT', value: 'PVB' },
        ]}
        selected={selectedOption}
        onChange={setSelectedOption}
        setHistory={setHistory}
        setcurrentMove={setcurrentMove}
        NEW_GAME={NEW_GAME}
      />
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <Reset resetGame={resetGame} winner={winner} />
      {/* <History history={history} moveTo={moveTo} currentMove={currentMove} /> */}
    </div>
  );
}

export default App;
