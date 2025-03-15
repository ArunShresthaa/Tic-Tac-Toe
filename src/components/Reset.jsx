const Reset = ({ resetGame, winner }) => {
  return (
    <button
      className={`btn-reset ${winner ? 'active' : ''}`}
      onClick={() => resetGame()}
    >
      Reset
    </button>
  );
};

export default Reset;
