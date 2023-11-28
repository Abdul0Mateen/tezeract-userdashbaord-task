import { combineReducers } from "@reduxjs/toolkit";
import userDataReducer from "./userDataSlice";
import activeMenuReducer from "./activeMenuSlice";

const rootReducer = combineReducers({
  userData: userDataReducer,
  activeMenu: activeMenuReducer,
});

export default rootReducer;
