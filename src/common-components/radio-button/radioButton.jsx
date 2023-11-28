import "./radioButton.css";

const RadioButton = (props) => {
  const { onChange, radioLabel, name, value } = props;
  return (
    <div className="radioButtonWrapper">
      <input
        className="radioButtonInput"
        type="radio"
        onChange={onChange}
        name={name}
        value={value}
      />
      <label htmlFor="" className="radioButtonLabel">
        {radioLabel}
      </label>
    </div>
  );
};

export default RadioButton;
