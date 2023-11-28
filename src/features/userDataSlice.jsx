// userDataSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    userData: [],
  },
  reducers: {
    addNewUser: (state, action) => {
      state.userData.push(action.payload);
    },
  },
});

export const { addNewUser } = userDataSlice.actions;
export default userDataSlice.reducer;
