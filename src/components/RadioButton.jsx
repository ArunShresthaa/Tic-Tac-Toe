const RadioButton = ({
  name,
  options,
  selected,
  onChange,
  setHistory,
  setcurrentMove,
  NEW_GAME,
}) => {
  return (
    <div className="radio-group">
      {options.map(option => (
        <label key={option.value} style={{ marginRight: '10px' }}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={() => {
              onChange(option.value);
              setHistory(NEW_GAME);
              setcurrentMove(0);
            }}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
