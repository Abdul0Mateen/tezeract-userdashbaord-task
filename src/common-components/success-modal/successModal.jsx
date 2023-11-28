import React from "react";
import "./successModal.css";
import checkIcon from "../../assets/images/checked.png";

export const SuccessModal = () => {
  return (
    <div className="successModalContainer">
      <div className="successModalWrapper">
        <img src={checkIcon} alt="" />
        <h1>User Added Successfully</h1>
      </div>
    </div>
  );
};
