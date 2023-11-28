import "./toggleButton.css";
const ToggleButton = (props) => {
  const { onChange, toggleLabel, check, value, name, readOnly } = props;

  return (
    <div className="toggleButtonContainer">
      <input
        className="toggleButtonInput"
        type="checkbox"
        onChange={onChange}
        checked={check}
        value={value}
        name={name}
        readOnly={readOnly}
      />
      <label htmlFor="">{toggleLabel}</label>
    </div>
  );
};

export default ToggleButton;
