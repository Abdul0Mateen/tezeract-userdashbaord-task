import "./inputField.css";
import errorIcon from "../../assets/images/error-icon.png";
const InputField = (props) => {
  const {
    inputlabel,
    errorMessage,
    onChange,
    placeholder,
    type,
    onBlur,
    value,
    name,
  } = props;
  return (
    <div className="inputFieldContainer">
      <label className="inputFieldLabel" htmlFor="">
        {inputlabel}
      </label>
      <div className="inputFieldWrapper">
        {errorMessage && (
          <img className="inputFieldIcon" src={errorIcon} alt="icon" />
        )}
        <input
          onChange={onChange}
          className={`inputField ${errorMessage && "error-class"}`}
          type={type}
          placeholder={placeholder}
          onBlur={onBlur}
          value={value}
          name={name}
        />
      </div>
      {errorMessage && (
        <div className="inputErrorMessage">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default InputField;
