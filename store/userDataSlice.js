import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "S J Patra",
  email: "sj@email.com",
  mobile: "+91 7654768934",
  isLoggedIn: false,
};

//user slice
export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
    removeUserData: (state, action) => {
      state.email = "";
      state.name = "";
      state.isLoggedIn = false;
    },
  },
});

// reducer actions
export const { setUserData, removeUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
