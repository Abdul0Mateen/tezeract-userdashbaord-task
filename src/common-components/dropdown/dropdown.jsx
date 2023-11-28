import "./dropdown.css";
import dropIcon from "../../assets/images/drop-icon.png";
import { useEffect, useRef, useState } from "react";
const Dropdown = (props) => {
  const { children, menuLabel, onChange, errorMessage } = props;
  const [operMenu, setOpenMenu] = useState(false);
  const [selectedVal, setSelectedVal] = useState(children[0].props.children);
  const dropdownRef = useRef(null);
  const handleDropMenu = () => {
    setOpenMenu(!operMenu);
  };
  const handleSelectedValue = (menuValue) => {
    if (menuValue !== children[0].props.children) {
      setSelectedVal(menuValue);
      setOpenMenu(!operMenu);
      if (onChange) {
        onChange(menuValue);
      }
    }
  };
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div ref={dropdownRef} className="dropDownContainer">
      <label className="dropMenuLabel" htmlFor="">
        {menuLabel}
      </label>
      <div className="dropDownToggleWrapper" onClick={handleDropMenu}>
        <div
          className={`dropDownToggle ${operMenu && "activeDropDown"} ${
            errorMessage && "error-class"
          }`}
        >
          {selectedVal}
        </div>
        <img
          className={`dropDownIcon ${operMenu && "activeDropIcon"}`}
          src={dropIcon}
          alt="icon"
        />
      </div>
      {errorMessage && (
        <div className="inputErrorMessage">
          <p>{errorMessage}</p>
        </div>
      )}
      {operMenu && (
        <ul className="dropDownList">
          {children.map((menuList, index) => (
            <li
              onClick={() => handleSelectedValue(menuList.props.children)}
              key={index}
            >
              {menuList.props.children}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
