const StatusMessage = ({ winner, gamingBoard }) => {
  const { squares, isXNext } = gamingBoard;
  const noMovesLeft = squares.every(squareValue => squareValue !== null);
  const nextPlayer = isXNext ? 'X' : 'O';

  const renderStatusMessage = () => {
    if (winner) {
      return (
        <>
          Winner is{' '}
          <span className={winner === 'X' ? 'text-green' : 'text-orange'}>
            {winner}
          </span>
        </>
      );
    }

    if (!winner && noMovesLeft) {
      return <>Its a Draw !!!</>;
    }

    return (
      <>
        Next Player is{' '}
        <span className={isXNext ? 'text-green' : 'text-orange'}>
          {nextPlayer}
        </span>
      </>
    );
  };

  return <h2 className="status-message">{renderStatusMessage()}</h2>;
};

export default StatusMessage;
